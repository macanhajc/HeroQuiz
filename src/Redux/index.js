import {combineReducers} from 'redux';
import {GameReducer} from './GameReducers';
import {HeroReducer} from './HeroReducers';
import {LeaderboardReducer} from './LeaderboardReducers';

export default combineReducers({GameReducer, HeroReducer, LeaderboardReducer});
