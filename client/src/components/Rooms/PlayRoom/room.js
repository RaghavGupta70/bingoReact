import queryString from "query-string";
import React,{useEffect} from "react";
import {useLocation} from "react-router-dom";

const Room = () => {

    const location = useLocation();
    const {roomID} = queryString.parse(location.search,{
    ignoreQueryPrefix: true
  }); 

    return <h1>{roomID}</h1>
}

export default Room;