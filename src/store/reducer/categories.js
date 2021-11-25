import * as types from "../constants/ActionTypes";

const initialState = null;

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_CATEGORIES:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default categories;
