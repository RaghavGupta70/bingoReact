import axios from "axios";

const url = "http://localhost:5000/auth";
const profileURl = "http://localhost:5000/profile";

export const fetchUsers= () => axios.get(url);
export const signUpUser= (data) => axios.post(`${url}/signUp`,data);
export const signInUser= (data) => axios.post(`${url}/signIn`,data);
export const googleSignInUser= (data) => axios.post(`${url}/googleSignIn`,data);
export const getProfile = (email) => axios.get(`${profileURl}/getMyProfile/${email}`);
export const getOpponents = (email) => axios.get(`${profileURl}/getAllOpponents/${email}`);
export const getLeaderBoard = () => axios.get(`${profileURl}/getLeaderboardData`);
export const updatePlayerData = (email,data) => axios.patch(`${profileURl}/updateProfile/${email}`,data);