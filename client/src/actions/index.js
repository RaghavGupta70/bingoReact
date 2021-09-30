import * as api from "../api/index.js";
import { FETCH,AUTH,CHECK,PROF,OPP_PROF } from "../constants/actionTypes.js";


export const fetchUsers = () => async (dispatch) => {

    try {
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH,payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const SignUpUser = (user,history) => async (dispatch) => {
    try {
        const {data} = await api.signUpUser(user);
        dispatch({type: AUTH,payload: data})
        history.push("/Home");
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

export const GoogleSignIn = (user,history) => async(dispatch) => {
    try {
        const userData = {email:user.email,userName:user.name,password:user.name+user.email};
        const { data } = await api.googleSignInUser(userData);
        dispatch({type:AUTH, payload:data});
        history.push('/Home');
    } catch (error) {
        console.log(error);
    }
}

export const fetchProfile  = (email) => async(dispatch) => {
    try {
        const {data} = await api.getProfile(email);
        dispatch({type: PROF,payload: data});
    }
    catch (error)
    {
        console.log(error);
    }
} 

export const fetchOppProfile = (email) => async (dispatch) => {
  try {
    const { data } = await api.getProfile(email);
    dispatch({ type: OPP_PROF, payload: data });
  } catch (error) {
    console.log(error);
  }
}; 