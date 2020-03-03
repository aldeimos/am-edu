import types from './action-types';

const initialState = {
  activeStory: 'music',
  musicActivePanel: 'home',
  history: ['home']
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ACTIVE_STORY:
      return {
        ...state,
        activeStory: action.payload
      };
    case types.CHANGE_MUSIC_ACTIVE_PANEL:
      return {
        ...state,
        musicActivePanel: action.payload
      };
    case types.UPDATE_HISTORY:
      return {
        ...state,
        history: [...action.payload]
      };
    default: return state;
  }
};

export default  appReducer;
