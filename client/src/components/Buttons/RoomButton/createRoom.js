import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { io } from "socket.io-client";

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
            <input id="transition-modal-description" placeholder="Room ID" />
            </div>
            <div>
            <h2 id="transition-modal-title">Enter a Room</h2>
            <input id="transition-modal-description" placeholder="Room ID" />
            </div> 
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
