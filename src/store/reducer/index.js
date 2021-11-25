import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";
import list_Ncc from "./list_Ncc";

const myReducer = combineReducers({
  categories,
  brands,
  list_Ncc,
});

export default myReducer;
