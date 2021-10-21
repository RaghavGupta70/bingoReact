// import { set } from "mongoose";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
// import { getUserInRoom } from "../../../../../server/controllers/users";
import BingoImage from '../../assets/images/bingoGame.png';
import PlayButton from "../../components/Buttons/PlayButton/playButton";
import {
  getToken,
  getType,
  getUsers,
  getPlayValue,
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
      console.log('start',getUsers().length)
    }, [getUsers().length])

    useEffect(() => {
      socket.on('playStart',(played) =>{
        console.log('You called me')
        setPlay(played);
          })
    },[])


    const handlePlay = (e) => {
      e.preventDefault();
      setPlay(true);
      socket.emit('play',(roomID),(error) => {
        console.log('You played');
      })
    }

    // useEffect(() => {
    //   window.addEventListener("beforeunload", alertUser);
    //   return () => {
    //     window.removeEventListener("beforeunload", alertUser);
    //   };
    // }, []);
    // const alertUser = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "";
    // }
      // useEffect(() => {
      //   const swalWithBootstrapButtons = Swal.mixin({
      //     customClass: {
      //       confirmButton: "btn btn-success",
      //       cancelButton: "btn btn-danger",
      //     },
      //     buttonsStyling: false,
      //   });

      //   swalWithBootstrapButtons
      //     .fire({
      //       title: "Are you sure?",
      //       text: "You won't be able to revert this!",
      //       icon: "warning",
      //       showCancelButton: true,
      //       confirmButtonText: "Yes, Exit Game!",
      //       cancelButtonText: "No, cancel!",
      //       reverseButtons: true,
      //     })
      //     .then((result) => {
      //       if (result.isConfirmed) {
      //         history.push("/home");
      //       } else if (result.dismiss === Swal.DismissReason.cancel) {
      //       }
      //     });
      // }, []);

      // useEffect(() => {
      //   setReload(
      //     performance.navigation.type === performance.navigation.TYPE_RELOAD
      //   );
      // }, []);

 
  // }, []);

  // for (var h = 0; h < 25; h++) {
  //   temp.push(h+1);
  // }

console.log('Chal ja Bhadwe');

  // useEffect(() => {
  //   setUsersRoom(getUsers());
  //   members = usersRoom.filter((user) => user.userName !== currentUser);
  //   setMessages(getUsers()[0].numbers);
  // }, [getUsers()[0]]);

  // function generator() {
  //   const num = Math.floor(Math.random() * 25 + 1);
  //   return num;
  // }

  return (
    <div className={roomStyles.bingoRoom}>
      {getToken() != null ? (<>
        <div className="members">
          <span>Room Id:-{roomID}</span>{
            usersRoom.length > 0 &&
              <MembersInRoom names={usersRoom} />
          }
        </div>  
          <div className={roomStyles.bingoGame}>
          {play ? (
            <>
            <img src={BingoImage} />
            {usersLen >=2? <h6> Start</h6>: null}
            </>
          ) : (
            <>
              {" "}
              {/* <ul>
                {}
                {messages ? (
                  <>
                    {" "}
                    <li>{messages.map((val) => val.userName)}</li>
                    <li>{messages.map((val) => val.value)}</li>
                  </>
                ) : null}
              </ul> */}
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
