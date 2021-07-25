import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./styles.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { SignUpUser,SignInUser,GoogleSignIn } from '../../actions/index.js';
import PropTypes from "prop-types";
import { GoogleLogin } from 'react-google-login';
import Icon from './icon.jsx';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

async function loginUser(credentials) {
  return fetch('http://localhost:5000/SignIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": "Raghav"
    })
  })
    .then(data => {const r = data.json()
    console.log(r)
  return r})
 }

export default function Auth({ type,setToken }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({
    email:'',userName:'',password:''
  });

  const [error, setError] = useState('');  

  const handleClick = async (e) => {
    
    if (type === "SignIn") 
    {
      if(userData.email.trim()==='' || userData.password.trim() ===''){
        setError('Please fill all the required fields!')
        return;
     }
      if(!checkFields())
        return;
      const res = dispatch(SignInUser(userData,history));
      const token = await loginUser(userData);
      console.log(token)
              setToken(token);
              localStorage.setItem("tok",JSON.stringify(token));
    }
    else {
      if(userData.email.trim()===''|| userData.userName.trim()===''|| userData.password.trim() ===''){
         setError('Please fill all the required fields!')
         return;
      }
       if(!checkFields())
        return;
      dispatch(SignUpUser(userData,history));
      console.log(userData) 
    }
}

  const checkFields = () => {
     if(!userData.email.includes('@')){
       setError("Email must include @ symbol!");
       return false;
     }
     return true;
  }

  const handleChange = (e) => {
     var {name,value} = e.target;
     setUserData(prevVal =>{
         return {...prevVal,[name]:value};
     });
  }

  const googleSuccess = async(res) => {
     const result = res?.profileObj;
     dispatch(GoogleSignIn(result,history));
     const token = await loginUser(userData);
      console.log(token)
              setToken(token);
              localStorage.setItem("tok",JSON.stringify(token));
  }

  const googleFailure = () => {
     console.log("Error during google sign in");
  }


  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {type}
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={userData.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            {type === "SignUp" ? <TextField
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
              fullWidth
              value={userData.userName}
              id="userName"
              label="Username"
              name="userName"
            /> : null}
            <TextField
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={userData.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <p>{error}</p>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              {type === "SignIn"? "Sign In to Bingo" : "Sign Up on Bingo"}
            </Button>
            <Grid container>
              {type === "SignIn" ? <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> : null}
              {type === "SignIn" ? <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> : <Link href="/SignIn" className={classes.link}>
                {"Already a User Sign In !!"}
              </Link>}
            </Grid>
          </div>
          <GoogleLogin clientId="453680329284-9t4ic7kq6krkfgqnabl6tsnak2r63ldq.apps.googleusercontent.com" render={(renderProps) =>
             <Button fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button> 
          }
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin" />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired
}