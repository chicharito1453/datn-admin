import * as types from "../constants/ActionTypes";

const initialState = null;

const list_Admin = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_ADMIN:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_Admin;
