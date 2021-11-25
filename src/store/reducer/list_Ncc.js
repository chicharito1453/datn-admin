import * as types from "../constants/ActionTypes";

const initialState = null;

const list_Ncc = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_NCC:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_Ncc;
