import { combineReducers } from "redux";
import categories from "./categories";
import brands from "./brands";

const myReducer = combineReducers({
  categories,
  brands,
});

export default myReducer;
