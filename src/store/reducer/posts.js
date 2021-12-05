import * as types from "../constants/ActionTypes";

const initialState = null;

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_POSTS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default posts;
