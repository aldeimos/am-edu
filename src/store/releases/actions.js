import types from "./action-types";


export const changeActiveStory = (story) => {
  return {
    type: types.CHANGE_ACTIVE_STORY,
    payload: story
  }
};

export const setSelectedRelease = (id) => {
  return {
    type: types.SET_SELECTED_RELEASE,
    payload: id
  }
};

