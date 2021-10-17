import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { putUsers,addUsers,getUserEmail } from "../../../utils/commonData/common";
import CreateButton from "../HomeRoomButton/createButton";
import "./styles.css";

let socket;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function JoinRoom({ type }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";
  var [roomId, setroomId] = useState(null);
  const history = useHistory();
  const [ID, setID] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (usersInRoom) => {
      const success = putUsers(usersInRoom);
    });
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const v = JSON.parse(localStorage.getItem("user"));

    socket.emit("create", v.result.userName,getUserEmail(), (error) => {
      alert("You joined Lodu");
      console.log(error);
    });

    socket.on("room", (roomData, callback) => {
      setroomId(roomData.roomId);
      const success = putUsers([roomData]);
      if (success) {
        sessionStorage.setItem("currentType", "Creator");
        history.push(`/Room?roomID=${roomData.roomId}`);
      } else {
        history.push("/");
      }
    });
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    const v = JSON.parse(localStorage.getItem("user"));
    const value = v.result.userName;

    console.log(ID);

    socket.emit("join", ID, value,getUserEmail(),(error) => {
      alert("You joined Lodu");
      console.log(error);
    });
    socket.on("room", (roomData, callback) => {
      setroomId(roomData.roomId);
      const success = addUsers(roomData);
      sessionStorage.setItem('JoinedPlayer',JSON.stringify(roomData));
      if (success) {
        sessionStorage.setItem("currentType", "NonCreator");
        history.push(`/Room?roomID=${roomData.roomId}`);
      } else {
        history.push("/");
      }
    });
  };

  return (
    <div class="buttonContainer">
      <CreateButton text={"Create Room"} onclick={handleClick} />
      <CreateButton text={"Join Room"} onclick={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{ display: "block", justifyContent: "center" }}
          >
            <div>
              <h2 id="transition-modal-title">Enter Room Id </h2>
              <input
                id="transition-modal-description"
                placeholder="Room ID"
                value={ID}
                onChange={(e) => {
                  setID(e.target.value);
                  console.log(ID);
                }}
              />
              <button id="transition-modal-description" onClick={handleClick2}>
                Join Room
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
