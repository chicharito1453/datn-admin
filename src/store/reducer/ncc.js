import * as types from "../constants/ActionTypes";

const initialState = {
  username: "",
  password: "",
  nccname: "",
  ncclogo: null,
  email: "",
  sdt: "",
  city: "",
  address: "",
  active: null,
  description: "",
};

const ncc = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NCC:
      state = action.payload || initialState;
      return state;
    default:
      return state;
  }
};
export default ncc;
