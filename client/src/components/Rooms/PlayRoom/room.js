// import { set } from "mongoose";
import queryString from "query-string";
import React, { useEffect,useState } from "react";
import {useLocation} from "react-router-dom";
// import { getUserInRoom } from "../../../../../server/controllers/users";
import { getToken,getUsers,getPlayValue } from "../../../utils/commonData/common";
import BingoGrid from '../../BingoGame/bingoGrid.js';

const Room = () => {

    const location = useLocation();
    const [messages,setMessages] = useState([]);
    var [usersRoom,setUsersRoom] = useState(getUsers());
    const currentUserInfo = JSON.parse(localStorage.getItem('user'));
    const currentUser = currentUserInfo.result.userName;
    const {roomID} = queryString.parse(location.search,{
    ignoreQueryPrefix: true
  });
  let members=usersRoom.filter((user)=> user.userName !== currentUser);;
   
  useEffect(()=>{
    setUsersRoom(getUsers());
    members = usersRoom.filter((user)=> user.userName !== currentUser); 
    setMessages(getUsers()[0].numbers);
  },[getUsers()])

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
    

    return (
      <>
        {getToken() != null ? (
          <>
            <span>Room Id:-{roomID}</span>
            <h1>Members in Room</h1>
            <ul>
              {members.map((member) => (
                <li>{member.userName}</li>
              ))}
              {messages?(<> <li>{messages.map((val) => val.userName)}</li>
              <li>{messages.map((val) => val.value)}</li></>):null}
             
            </ul>
            <BingoGrid
              arrNum={bingoNum}
              shuffleArr={shuffleArray}
              generate={generator}
            />
          </>
        ) : (
          <>
            <h1>Access Denied</h1>
          </>
        )}
      </>
    );
}

export default Room;