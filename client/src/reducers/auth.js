import { FETCH, CHECK, AUTH, LOGOUT, PROF } from "../constants/actionTypes";

const auth = (users = { authData: null }, action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;

    case AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...users, authData: action?.payload };
    case CHECK:
      return localStorage.getItem("user");

    case LOGOUT:
      localStorage.clear();
      return { ...users, authData: null };

    case PROF:
      return action.payload;

    default:
      return users;
  }
};

export default auth;
