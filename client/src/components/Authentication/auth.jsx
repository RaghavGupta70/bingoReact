import react, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./styles.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { SignUpUser,SignInUser } from '../../actions/index.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Auth({ type }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({
    email:'',userName:'',password:''
  });

  const handleClick = (e) => {
    
    if (type === "SignIn") {
      dispatch(SignInUser(userData));
      history.push("/Home");
    }
    else {
      dispatch(SignUpUser(userData));
      console.log(userData)
      
    }
  }

  const handleChange = (e) => {
     var {name,value} = e.target;
     setUserData(prevVal =>{
         return {...prevVal,[name]:value};
     });
    //  console.log(name,value);
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
            {type === "SignIn" ? <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> : null}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Submit
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
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
