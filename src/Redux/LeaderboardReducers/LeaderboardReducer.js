import {handleApi, handleApiError, handleApiSuccess} from '../ActionConfigs';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const payload = {isLoading: false, response: null, error: null};
// Types

export const Types = {
  LIST_LEADERBOARD: 'leaderboard/LIST_LEADERBOARD',
  SAVE_LEADERBOARD: 'leaderboard/SAVE_LEADERBOARD',
  GET_LEADERBOARD: 'leaderboard/GET_LEADERBOARD',
};

// Reducers

const INITIAL_STATE = {
  list_leaderboard: payload,
  save_leaderboard: payload,
  user_leaderboard: payload,
};

export const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_LEADERBOARD:
      return {
        ...state,
        user_leaderboard: action.payload,
      };
    case Types.SAVE_LEADERBOARD:
      return {
        ...state,
        save_leaderboard: action.payload,
      };
    case Types.LIST_LEADERBOARD:
      return {
        ...state,
        list_leaderboard: action.payload,
      };
    default:
      return state;
  }
};

// Actions

export const listLeaderboardAction = () => {
  return async dispatch => {
    try {
      handleApi(true, Types.LIST_LEADERBOARD, dispatch);

      const ref = database().ref('/leaderboard/');
      const snapPoints = await ref.once('value');
      const list = snapPoints.val();

      const boards = [];
      for (let [key, value] of Object.entries(list)) {
        boards.push(value);
      }

      boards.sort((a, b) => b.points - a.points);

      handleApiSuccess(boards, Types.LIST_LEADERBOARD, dispatch);
    } catch (ex) {
      handleApiError(ex.message, Types.LIST_LEADERBOARD, dispatch);
    }
  };
};

export const saveLeaderboardAction = item => {
  return async dispatch => {
    try {
      handleApi(true, Types.SAVE_LEADERBOARD, dispatch);
      const uid = auth().currentUser.uid;
      const ref = database().ref(`/leaderboard/${uid}`);
      await ref.set(item, () => {
        handleApiSuccess(item, Types.SAVE_LEADERBOARD, dispatch);
      });
    } catch (ex) {
      handleApiError(ex.message, Types.SAVE_LEADERBOARD, dispatch);
    }
  };
};

export const getLeaderboardAction = () => {
  return async dispatch => {
    try {
      handleApi(true, Types.GET_LEADERBOARD, dispatch);

      const uid = auth().currentUser.uid;
      const ref = database().ref(`/leaderboard/${uid}`);
      const snapshot = await ref.once('value');
      const item = snapshot.val();

      handleApiSuccess(null, Types.SAVE_LEADERBOARD, dispatch);
      handleApiSuccess(item, Types.GET_LEADERBOARD, dispatch);
    } catch (ex) {
      handleApiError(ex.message, Types.GET_LEADERBOARD, dispatch);
    }
  };
};
