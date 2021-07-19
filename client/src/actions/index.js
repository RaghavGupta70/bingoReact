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

<<<<<<< Updated upstream

export const SignUpUser = (user,history) => async (dispatch) => {
=======
export const SignUpUser = (user) => async (dispatch) => {
>>>>>>> Stashed cha
    try {
        const {data} = await api.signUpUser(user);
        dispatch({type: AUTH,payload: data})
        history.push("/SignUp");
    } catch (error) {
        console.log(error.response);
    }
} 

export const SignInUser = (user,history) => async (dispatch) => {
    try {
        const {data} = await api.signInUser(user);
        dispatch({type: AUTH,payload: data});
      history.push("/Home")
    } catch (error) {
        console.log(error);
    }
}