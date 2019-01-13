import { combineReducers } from "redux";

import Auth from "./auth";
import Language from "./language";
import Navigator from "./navigation";
import Api from "./api";

export default combineReducers({
  Auth,
  Language,
  Navigator,
  Api
});
