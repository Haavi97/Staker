import { createStore } from "redux";

// Reducer function
const reducer = (state = { dataString: "" }, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;
