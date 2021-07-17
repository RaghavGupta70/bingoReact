import * as api from "../api/index.js";
import { FETCH,AUTH,CHECK } from "../constants/actionTypes.js";

export const fetchUsers = () => async (dispatch) => {

    try {
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH,payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const signUpUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.signUpUser(user);
        dispatch({type: SIGNUP,payload: data})
    } catch (error) {
        console.log(error);
    }
} 

export const signInUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.signInUser(user);
        dispatch({action: AUTH,payload: data});
    } catch (error) {
        console.log(error);
    }
}