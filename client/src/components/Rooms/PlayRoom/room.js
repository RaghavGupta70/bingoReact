import queryString from "query-string";
import React, { useEffect,useState } from "react";
import {useLocation} from "react-router-dom";
import { getToken,getUsers } from "../../../utils/commonData/common";

const Room = () => {

    const location = useLocation();
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
  },[getUsers()])
    

    return <>
    {getToken() != null ? (
      <>
       <span>Room Id:-{roomID}</span>
       <h1>Members in Room</h1>
       <ul>
         {members.map((member)=>(
           <li>{member.userName}</li>
         ))}
       </ul> 
      </>
    ) : (
      <>
       <h1>Access Denied</h1>
      </>
    )}
    </>
}

export default Room;