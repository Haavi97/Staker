// Action Types
export const SET_USER_DATA = "SET_USER_DATA";

// Action Creators
export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};
