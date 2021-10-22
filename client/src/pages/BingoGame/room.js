// import { set } from "mongoose";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch,useSelector } from "react-redux";
import { lockRoomCreator } from "../../actions/index";
import BingoImage from '../../assets/images/bingoGame.png';
import PlayButton from "../../components/Buttons/PlayButton/playButton";
import {
  getToken,
  getType,
  getUsers,
  getPlayValue,
  getUserName,
} from "../../utils/commonData/common";
import BingoGrid from "../../components/BingoGame/bingoGrid.js";
import ChatBox from '../../components/ChatBox/chatBoxGame';
import roomStyles from './roomStyles.module.css';
import MembersInRoom from '../../components/MembersInRoom/membersInRoom.jsx';

let socket;

const Room = () => {
  // var temp = [];
  const location = useLocation();
  const [usersLen,setUsersLen] = useState(0);
  const dispatch = useDispatch();
  const ENDPOINT = "localhost:5000";
  const history = useHistory();
  const [play,setPlay] = useState(false);
  const usersRoom = useSelector((state) => state.game);
  var [messages, setMessages] = useState([]);
   const currentUserInfo = JSON.parse(localStorage.getItem("user"));
  const currentUser = currentUserInfo.result.userName;
  const { roomID } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
    useEffect(() => {
      socket = io(ENDPOINT);
    }, [ENDPOINT]);

    useEffect(()=> {
      console.log(usersRoom);
      messages = getUsers();
      setMessages(getUsers())
    },[usersRoom]);

    useEffect(() => {
      // setUsersRoom(getUsers())
      setUsersLen(getUsers().length)
      console.log('start', getUsers().length, JSON.parse(sessionStorage.getItem('lock')))
    }, [getUsers().length,sessionStorage.getItem('lock')])

    useEffect(() => {
      console.log('socket play', JSON.parse(sessionStorage.getItem('lock')))
      setPlay(JSON.parse(sessionStorage.getItem('lock')));
    })

    setInterval(() => {
      if (JSON.parse(sessionStorage.getItem('lock')) === true)
      setPlay(JSON.parse(sessionStorage.getItem('lock')));
    },2000);


    const handlePlay = (e) => {
      e.preventDefault();
      setPlay(true);
      dispatch(lockRoomCreator(roomID));
      socket.emit('play',(roomID),(error) => {
        console.log('You played');
      })
    }

   
console.log('Chal ja Bhadwe');

  

  return (
    <div className={roomStyles.bingoRoom}>
      {getToken() != null ? (<>
        <div className={roomStyles.members}>
          <span>Room Id:-{roomID}</span>{
            usersRoom.length > 0 &&
              <MembersInRoom names={usersRoom} />
          }
        </div>  
          <div className={roomStyles.bingoGame}>
          {!play ? (
            <>
            <img src={BingoImage} width="35%" />
            {usersLen >=2 ? getUsers()[0].userName === getUserName()? <PlayButton onClick={handlePlay} />: <h5>Waiting for the Host to Start the game</h5>:null}
            </>
          ) : (
            <>
              <BingoGrid setMessage={setMessages} />
            </>
          )}
          </div>
          <div className={roomStyles.chat}>
          { messages.length>0 && <ChatBox text={"Player Chat"} message={messages} />}
          </div>
        </>
      ) : (
        <>
          <h1>Access Denied</h1>
        </>
      )}
    </div>
  );
};

export default Room;
