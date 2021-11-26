import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";
import list_Ncc from "./list_Ncc";
import ncc from "./ncc";
import list_Ctv from "./list_Ctv";

const myReducer = combineReducers({
  categories,
  brands,
  list_Ncc,
  ncc,
  list_Ctv,
});

export default myReducer;
