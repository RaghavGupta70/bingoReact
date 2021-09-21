// import { set } from "mongoose";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
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

let socket;

const Room = () => {
  // var temp = [];
  const location = useLocation();
  const ENDPOINT = "localhost:5000";
  const history = useHistory();
  const bingoNum=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  const [play,setPlay] = useState(false);
  const [messages, setMessages] = useState([]);
  var [usersRoom, setUsersRoom] = useState(getUsers());
  const currentUserInfo = JSON.parse(localStorage.getItem("user"));
  const currentUser = currentUserInfo.result.userName;
  const { roomID } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  let members = usersRoom.filter((user) => user.userName !== currentUser);
  
  // useEffect(() => {
    // setBingoNum(temp);
    useEffect(() => {
      socket = io(ENDPOINT);
    }, [ENDPOINT]);

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

    useEffect(() => {
      window.addEventListener("beforeunload", alertUser);
      return () => {
        window.removeEventListener("beforeunload", alertUser);
      };
    }, []);
    const alertUser = (e) => {
      e.preventDefault();
      e.returnValue = "";
    }
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

    for (let i = bingoNum.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bingoNum[i], bingoNum[j]] = [bingoNum[j], bingoNum[i]];
    }
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
    <>
      {getToken() != null ? (
        <>
          <span>Room Id:-{roomID}</span>
          <h1>Members in Room</h1>
          {!play ? (
            <>
            <img src={BingoImage} />
            {getType() === 'Creator'?
            <PlayButton onClick={handlePlay}/>
            :<h4>Waiting for the host to start the game!</h4>}
            </>
          ) : (
            <>
              {" "}
              <ul>
                {members.map((member) => (
                  <li>{member.userName}</li>
                ))}
                {messages ? (
                  <>
                    {" "}
                    <li>{messages.map((val) => val.userName)}</li>
                    <li>{messages.map((val) => val.value)}</li>
                  </>
                ) : null}
              </ul>
              <BingoGrid arrNum={bingoNum} />
            </>
          )}
        </>
      ) : (
        <>
          <h1>Access Denied</h1>
        </>
      )}
    </>
  );
};

export default Room;