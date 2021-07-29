import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {LOGOUT } from "../../../constants/actionTypes";


export default function LogoutButton() {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e)=> {dispatch({type:LOGOUT}); history.push("/SignIn")}
  return (
    <Button variant="contained" color="primary" disableElevation onClick={handleClick}>
      Logout
    </Button>
  );
}
