import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Socket } from "socket.io-client";
import BingoGrid from '../../BingoGame/bingoGrid'; 
import JoinRoom from "../../Buttons/RoomButton/joinRoom.js"
import { io } from "socket.io-client";
import Navbar from '../../Navbar/navbar.jsx';

let socket;
function Home({token}) {
    const history = useHistory();
   useEffect(() => {
       if(!token){
        history.push('SignIn');
       } 
   });

   const user = JSON.parse(localStorage.getItem('user'));
   const person = user.result.userName;

   var bingoNum = [];
   for(var h=0;h<25;h++){
       bingoNum.push(h+1);
   }

   function shuffleArray(array) {
       for (let i = array.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [array[i], array[j]] = [array[j], array[i]];
       }
   }

   function generator() {
     const num = Math.floor((Math.random() * 25)+1);
     return num;
   }
   
   return(
       <>
      <JoinRoom style={{display: "flex",margin: "auto"}} />
      </>
   );
}

export default Home;