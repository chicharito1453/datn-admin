import * as types from "../constants/ActionTypes";

const initialState = null;

const list_property = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_PROPERTIES:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default list_property;
