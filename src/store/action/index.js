import * as types from "../constants/ActionTypes";

// CATEGORY
export const ALL_CATEGORIES = (payload) => {
  return {
    type: types.ALL_CATEGORIES,
    payload,
  };
};

// BRAND
export const ALL_BRANDS = (payload) => {
  return {
    type: types.ALL_BRANDS,
    payload,
  };
};

// DANH SÁCH NCC
export const ALL_NCC = (payload) => {
  return {
    type: types.ALL_NCC,
    payload,
  };
};

// SET GIÁ TRỊ NCC
export const SET_NCC = (payload) => {
  return {
    type: types.SET_NCC,
    payload,
  };
};
