import * as types from "../constants/ActionTypes";

const initialState = null;

const list_orders = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_ORDERS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_orders;
