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
