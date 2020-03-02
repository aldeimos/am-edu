import types from "./action-types";


export const changeActiveStory = (story) => {
  return {
    type: types.CHANGE_ACTIVE_STORY,
    payload: story
  }
};

export const changeMusicActivePanel = (panel) => {
  return {
    type: types.CHANGE_MUSIC_ACTIVE_PANEL,
    payload: panel
  }
};

export const updateHistory = (newHistory) => {
  return {
    type: types.UPDATE_HISTORY,
    payload: newHistory
  }
};



