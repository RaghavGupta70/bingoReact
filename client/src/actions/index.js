import * as api from "../api/index.js";
import Auth from "../components/Authentication/auth.jsx";
import { FETCH,AUTH,CHECK } from "../constants/actionTypes.js";

export const fetchUsers = () => async (dispatch) => {

    try {
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH,payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const SignUpUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.signUpUser(user);
        dispatch({type: AUTH,payload: data})
    } catch (error) {
        console.log(error.response);
    }
} 

export const SignInUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.signInUser(user);
        dispatch({type: AUTH,payload: data});
    } catch (error) {
        console.log(error);
    }
}