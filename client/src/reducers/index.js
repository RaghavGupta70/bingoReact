import { combineReducers } from "redux";

import auth from "./auth";
import profile from './profile';
import oppProfile from "./oppProfile";
import leaderBoardDataSet from "./leaderData";
import game from './game.js';

export const reducers = combineReducers({
    auth,
    profile,
    oppProfile,
    leaderBoardDataSet,
    game,
});