import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";
import list_Ncc from "./list_Ncc";
import ncc from "./ncc";
import list_Ctv from "./list_Ctv";
import ctv from "./ctv";
import list_product from "./list_product";
import list_admin from "./list_admin";
import list_property from "./list_property";

const myReducer = combineReducers({
  categories,
  brands,
  list_Ncc,
  ncc,
  list_Ctv,
  ctv,
  list_product,
  list_admin,
  list_property,
});

export default myReducer;
