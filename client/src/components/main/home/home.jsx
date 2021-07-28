import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom';
import BingoGrid from '../../BingoGame/bingoGrid'; 
import CreateRoom from "../../Buttons/RoomButton/createRoom.js"

function Home({token}) {
    const history = useHistory();
   useEffect(() => {
       if(!token)
        history.push('SignIn');
   });

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
      {token && <BingoGrid arrNum={bingoNum} shuffleArr={shuffleArray} generate={generator} />}
      <CreateRoom style={{display: "flex",margin: "auto"}} />
      </>
   );
}

export default Home;