import * as api from "../api/index.js";
import { FETCH,AUTH,LEAD_DATA,PROF,OPP_PROF,UPDATE_PROF,CREATE_ROOM,JOIN_ROOM,FETCH_ROOM,CUT_NUM } from "../constants/actionTypes.js";


export const fetchUsers = () => async (dispatch) => {

    try {
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH,payload: data})
    } catch (error) {
        return (error.response.data.message)
    }
}

export const SignUpUser = (user,history) => async (dispatch) => {
    try {
        const {data} = await api.signUpUser(user);
        dispatch({type: AUTH,payload: data})
        history.push("/Home");
    } catch (error) {
        return (error.response.data.message)
    }
} 

export const SignInUser = (user,history) => async (dispatch) => {
    try {
        const {data} = await api.signInUser(user);
        dispatch({type: AUTH,payload: data});
        history.push("/Home")
    } catch (error) {
        return (error.response.data.message)
    }
}

export const GoogleSignIn = (user,history) => async(dispatch) => {
    try {
        const userData = {email:user.email,userName:user.name,password:user.name+user.email};
        const { data } = await api.googleSignInUser(userData);
        dispatch({type:AUTH, payload:data});
        history.push('/Home');
    } catch (error) {
        return (error.response.data.message)
    }
}

export const fetchProfile  = (email) => async(dispatch) => {
    try {
        const {data} = await api.getProfile(email);
        dispatch({type: PROF,payload: data});
    }
    catch (error)
    {
        return (error.response.data.message)
    }
} 

export const fetchOppProfile = (email) => async (dispatch) => {
  try {
    const { data } = await api.getOpponents(email);
    dispatch({ type: OPP_PROF, payload: data });
  } catch (error) {
    return (error.response.data.message)
  }
}; 

export const fetchLeaderBoardData = () => async(dispatch) => {
    try {
        const {data} = await api.getLeaderBoard();
        dispatch({type: LEAD_DATA, payload: data});
    } catch (error) {
        return (error.response.data.message)
    }
}

export const updatePlayerProfile = (email,playerData) => async(dispatch) => {
    try{
        const {data} = await api.updatePlayerData(email,playerData);
        dispatch({type: UPDATE_PROF, payload: data})
    }
    catch(error)
    {
        return (error.response.data.message)
    }
}

export const createRoomPlayer = (data) => async(dispatch) => {
    try {
        // console.log(data);
        const message = await api.createRoom(data);
        console.log(message.data);
        dispatch({type: CREATE_ROOM, payload: message.data})
    } catch (error) {
        console.log(error);
    }
}

export const joinRoomPlayer = (data) => async (dispatch) => {
    try {
        // console.log(data);
        const message = await api.joinRoom(data);
        console.log(message.data);
        dispatch({ type: JOIN_ROOM, payload: message.data })
    } catch (error) {
        console.log(error);
    }
}

export const fetchRoomValue = (id) => async(dispatch) => {
    try {
        const message = await api.fetchRoom(id);
        console.log(id,message);
        dispatch({type: FETCH_ROOM,payload: message.data})
        return message.data;
    } catch (error) {
        console.log(error)
    }
}

export const cutNumbers = (numberSel) => async(dispatch) => {
    console.log(numberSel)
    try {
        dispatch({type: CUT_NUM, payload:numberSel});
    } catch (error) {
        console.log(error);
    }
}