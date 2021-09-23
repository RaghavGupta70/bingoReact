import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom'; 
import JoinRoom from "../../components/Buttons/RoomButton/joinRoom.js"
import { io } from "socket.io-client";
import Navbar from '../../components/Navbar/navbar.jsx';
import {useDispatch} from 'react-redux';
import {fetchProfile} from '../../actions/index.js';
import {getUserEmail} from '../../utils/commonData/common';

function Home({token}) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile(getUserEmail()));
      },[dispatch]);

   useEffect(() => {
       if(!token){
        history.push('SignIn');
       } 
   });

   const user = JSON.parse(localStorage.getItem('user'));
   const person = user.result.userName;
   
   return(
       <>
      <JoinRoom style={{display: "flex",margin: "auto"}} />
      </>
   );
}

export default Home;