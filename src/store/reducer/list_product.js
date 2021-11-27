import * as types from "../constants/ActionTypes";

const initialState = null;

const list_product = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_PRODUCTS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_product;
