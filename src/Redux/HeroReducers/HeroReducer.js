import {handleApi, handleApiError, handleApiSuccess} from '../ActionConfigs';
import {HERO_API} from '../../Configs/AxiosConfigs';

const payload = {isLoading: false, response: null, error: null};
// Types

export const Types = {
  LIST_HEROES: 'hero/LIST_HEROES',
};

// Reducers

const INITIAL_STATE = {
  list_heroes: payload,
};

export const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LIST_HEROES:
      return {
        ...state,
        list_heroes: action.payload,
      };
    default:
      return state;
  }
};

// Actions

export const listHeroesAction = () => {
  return async dispatch => {
    try {
      handleApi(true, Types.LIST_HEROES, dispatch);
      HERO_API()
        .get('all.json')
        .then(response => {
          var responseList = response.data.filter(
            f => !f.images.lg.includes('no-portrait'),
          );
          handleApiSuccess(responseList, Types.LIST_HEROES, dispatch);
        })
        .catch(error => {
          handleApiError(error.response, Types.LIST_HEROES, dispatch);
        });
    } catch (ex) {
      handleApiError(ex.message, Types.LIST_HEROES, dispatch);
    }
  };
};
