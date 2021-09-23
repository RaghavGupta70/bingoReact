import axios from "axios";

const url = "http://localhost:5000/auth";
const profileURl = "http://localhost:5000";

export const fetchUsers= () => axios.get(url);
export const signUpUser= (data) => axios.post(`${url}/signUp`,data);
export const signInUser= (data) => axios.post(`${url}/signIn`,data);
export const googleSignInUser= (data) => axios.post(`${url}/googleSignIn`,data);
export const getProfile = (data) => axios.get(`${profileURl}/profile/getMyProfile`,data);