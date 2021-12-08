import * as types from "../constants/ActionTypes";

const initialState = null;

const list_regi = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_REGIP:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_regi;
