import * as types from "../constants/ActionTypes";

const initialState = null;

const list_Ctv = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_CTV:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_Ctv;
