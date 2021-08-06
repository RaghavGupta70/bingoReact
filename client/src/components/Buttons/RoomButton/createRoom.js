import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { io } from "socket.io-client";
import {useHistory} from "react-router-dom"

let socket;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CreateRoom({type}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const ENDPOINT = 'localhost:5000';
  var [roomId,setroomId] = useState(null);
  const history = useHistory();
  const [ID,setID] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
  },[ENDPOINT]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const v =JSON.parse(localStorage.getItem('user'));

    socket.emit('create',(v.result.userName),(error) => {
      alert("You joined Lodu")
      console.log(error)
    })

    socket.on("room",(roomId,callback)=> {
      console.log(roomId);
      setroomId(roomId);
      history.push(`/Room?roomID=${roomId}`)
    callback();
    })

    socket.on('message',(user,text,callback)=> {
      console.log(user,text);
      callback();
    })
  }

   const handleClick2 = (e) => {
    e.preventDefault();
    const v =JSON.parse(localStorage.getItem('user'));
    const value = v.result.userName;

    console.log(ID)
    
    socket.emit('join',(ID),(value),(error) => {
      alert("You joined Lodu")
      console.log(error)
    })

    socket.on("room",(roomId,callback)=> {
      console.log(roomId);
      setroomId(roomId);
      history.push(`/Room?roomID=${roomId}`)
    callback();
    })
  }

  
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Join Room
      </button>
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
          <div className={classes.paper} style={{display: "block",justifyContent: "center"}}>
         <div ><h2 id="transition-modal-title">Create a Room</h2>
            <button id="transition-modal-description" onClick={handleClick}>Create Room</button>
            </div>
            <div>
            <h2 id="transition-modal-title">Enter a Room</h2>
            <input id="transition-modal-description" placeholder="Room ID" value={ID} onChange={(e) => {setID(e.target.value); console.log(ID)}}/>
            <button id="transition-modal-description" onClick={handleClick2}>Join Room</button>
            </div> 
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
