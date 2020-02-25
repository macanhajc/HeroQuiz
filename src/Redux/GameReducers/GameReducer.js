// Types

export const Types = {
  GAME_RESET: 'game/GAME_RESET',
  GAME_CONFIGS: 'game/GAME_CONFIGS',
  GAME_START: 'game/GAME_START',
  GAME_END: 'game/GAME_END',
  GAME_TIME_BONUS: 'game/GAME_TIME_BONUS',
  GAME_HERO_CHANGE: 'game/GAME_HERO_CHANGE',
};

// Reducers

const INITIAL_STATE = {
  game_config: {
    time: 30,
    listRandomHeroes: [],
    listRandomNames: [],
  },
  current_game: {
    started: false,
    finished: false,
    type: '',
    bonusTiming: 0,
    numberOfPoints: 0,
    numberOfHits: 0,
    numberOfMiss: 0,
    currentPosition: 0,
    listOfHeroesHit: [],
    listOfHeroesMiss: [],
  },
};

export const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GAME_RESET:
      return {
        ...state,
        game_config: {
          time: 120,
          listRandomHeroes: [],
          listRandomNames: [],
        },
        current_game: {
          started: false,
          finished: false,
          type: '',
          bonusTiming: 0,
          numberOfPoints: 0,
          numberOfHits: 0,
          numberOfMiss: 0,
          currentPosition: 0,
          listOfHeroesHit: [],
          listOfHeroesMiss: [],
        },
      };
    case Types.GAME_CONFIGS:
      return {
        ...state,
        game_config: action.config,
      };
    case Types.GAME_TIME_BONUS:
      return {
        ...state,
        current_game: action.currentGame,
      };
    case Types.GAME_END:
      return {
        ...state,
        current_game: {
          ...action.currentGame,
          finished: true,
        },
      };
    case Types.GAME_START:
      return {
        ...state,
        current_game: {
          started: true,
          finished: false,
          type: '',
          bonusTiming: 0,
          numberOfPoints: 0,
          numberOfHits: 0,
          numberOfMiss: 0,
          currentPosition: 0,
          listOfHeroesHit: [],
          listOfHeroesMiss: [],
        },
      };
    case Types.GAME_HERO_CHANGE:
      return {
        ...state,
        current_game: action.current_game,
      };
    default:
      return state;
  }
};

// Actions

export const gameReset = () => {
  return async dispatch => {
    dispatch({
      type: Types.GAME_RESET,
    });
  };
};

export const setMissHero = hero => {
  return async (dispatch, getState) => {
    var currentGame = getState().GameReducer.current_game;
    dispatch({
      type: Types.GAME_HERO_CHANGE,
      current_game: {
        ...currentGame,
        type: 'error',
        numberOfMiss: currentGame.numberOfMiss + 1,
        currentPosition: currentGame.currentPosition + 1,
        listOfHeroesMiss: [...currentGame.listOfHeroesMiss, hero],
      },
    });
  };
};

export const setHitHero = hero => {
  return async (dispatch, getState) => {
    var currentGame = getState().GameReducer.current_game;
    dispatch({
      type: Types.GAME_HERO_CHANGE,
      current_game: {
        ...currentGame,
        type: 'success',
        numberOfPoints: currentGame.numberOfPoints + 20,
        numberOfHits: currentGame.numberOfHits + 1,
        currentPosition: currentGame.currentPosition + 1,
        listOfHeroesHit: [...currentGame.listOfHeroesHit, hero],
      },
    });
  };
};

export const setGameStart = () => {
  return async dispatch => {
    dispatch({
      type: Types.GAME_START,
    });
  };
};

export const setGameTimeBonus = time => {
  return async (dispatch, getState) => {
    const currentGame = getState().GameReducer.current_game;
    dispatch({
      type: Types.GAME_TIME_BONUS,
      currentGame: {...currentGame, bonusTiming: time},
    });
  };
};

export const setGameEnd = () => {
  return async (dispatch, getState) => {
    const currentGame = getState().GameReducer.current_game;
    dispatch({
      type: Types.GAME_END,
      currentGame,
    });
  };
};

export const setGameConfigs = gameConfig => {
  return async (dispatch, getState) => {
    const ggConfig = getState().GameReducer.game_config;
    dispatch({
      type: Types.GAME_CONFIGS,
      config: {...ggConfig, ...gameConfig},
    });
  };
};
