import types from './action-types';


export const setSelectedRelease = (id) => {
  return {
    type: types.SET_SELECTED_RELEASE,
    payload: id
  }
};

export const deleteRelease = (releaseId) => {
  return {
    type: types.DELETE_RELEASE,
    payload: releaseId
  }
};

export const addRelease = (release) => {
  return {
    type: types.ADD_RELEASE,
    payload: release
  }
}
