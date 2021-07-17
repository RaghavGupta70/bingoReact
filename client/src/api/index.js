import axios from "axios";

const url = "http://localhost:5000/auth";

export const fetchUsers= () => axios.get(url);
export const signUpUser= (data) => axios.post(`${url}/signUp`,data);
export const signInUser= (data) => axios.post(`${url}/signIn`,data);
