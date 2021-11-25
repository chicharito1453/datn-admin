import * as types from "../constants/ActionTypes";

const initialState = null;

const brands = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_BRANDS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default brands;
