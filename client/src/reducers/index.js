import { combineReducers } from "redux";

import auth from "./auth";
import profile from './profile';
import oppProfile from "./oppProfile";

export const reducers = combineReducers({
    auth,
    profile,
    oppProfile,
});