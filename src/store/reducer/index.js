import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";
import list_Ncc from "./list_Ncc";
import ncc from "./ncc";
import list_Ctv from "./list_Ctv";
import ctv from "./ctv";
import list_product from "./list_product";

const myReducer = combineReducers({
  categories,
  brands,
  list_Ncc,
  ncc,
  list_Ctv,
  ctv,
  list_product,
});

export default myReducer;
