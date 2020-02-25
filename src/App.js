import React, {useEffect, useCallback} from 'react';
import {persistor, store} from './Configs/ConfigureStore';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './Scenes/Routes';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import * as RNLocalize from 'react-native-localize';
import {setI18nConfig} from './Configs/TranslationConfig';

const App = () => {
  useEffect(() => {
    setI18nConfig();
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, [handleLocalizationChange]);

  const handleLocalizationChange = useCallback(() => {
    setI18nConfig();
    this.forceUpdate();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
