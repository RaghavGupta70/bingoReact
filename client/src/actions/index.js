import * as api from "../api/index.js";
import { FETCH,SIGNUP,CHECK } from "../constants/actionTypes.js";

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

export const checkUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.checkUser(user);
        dispatch({action: CHECK,payload: data});
    } catch (error) {
        console.log(error);
    }
}