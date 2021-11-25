import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";
import list_Ncc from "./list_Ncc";
import ncc from "./ncc";

const myReducer = combineReducers({
  categories,
  brands,
  list_Ncc,
  ncc,
});

export default myReducer;
