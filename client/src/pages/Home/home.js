import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom'; 
import JoinRoom from "../../components/Buttons/RoomButton/joinRoom.js"
import { io } from "socket.io-client";
import Navbar from '../../components/Navbar/navbar.jsx';


function Home({token}) {
    const history = useHistory();

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