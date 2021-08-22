import React from 'react';
import { Tooltip,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {LOGOUT } from "../../../constants/actionTypes";
import { ExitToApp } from '@material-ui/icons';


export default function LogoutButton() {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e)=> {dispatch({type:LOGOUT}); history.push("/SignIn")}
  return (
    <Tooltip title="Logout">
    <Button variant="contained" color="primary" disableElevation onClick={handleClick}>
      <ExitToApp />
    </Button>
    </Tooltip>
  );
}
