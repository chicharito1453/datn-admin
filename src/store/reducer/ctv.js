import * as types from "../constants/ActionTypes";

const initialState = {
  username: "",
  password: "",
  fullname: "",
  image: null,
  email: "",
  sdt: "",
  address: "",
  active: null,
  sex: null,
};

const ctv = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CTV:
      state = action.payload || initialState;
      return state;
    default:
      return state;
  }
};
export default ctv;
