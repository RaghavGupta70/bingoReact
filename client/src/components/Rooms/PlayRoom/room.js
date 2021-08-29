import queryString from "query-string";
import React from "react";
import {useLocation} from "react-router-dom";
import { getToken,getUsers } from "../../../utils/commonData/common";

const Room = () => {

    const location = useLocation();
    const usersRoom = getUsers();
    const {roomID} = queryString.parse(location.search,{
    ignoreQueryPrefix: true
  });
    console.log(location)
    return <>
    {getToken() != null ? (
      <>
       <h1>{roomID}{usersRoom}</h1>
      </>
    ) : (
      <>
       <h1>Access Denied</h1>
      </>
    )}
    </>
}

export default Room;