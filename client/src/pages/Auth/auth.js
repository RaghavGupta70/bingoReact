import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignUpUser, SignInUser, GoogleSignIn } from "../../actions/index.js";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.jsx";
import passwordValidator from "password-validator";

function Copyright() {
  return (
    <p
      variant="body2"
      style={{ color: "white", fontSize: "0.8rem" }}
      align="center"
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

async function loginUser(credentials) {
  return fetch("http://localhost:5000/SignIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Raghav",
    }),
  }).then((data) => {
    const r = data.json();
    console.log(r);
    return r;
  });
}

export default function Auth({ type, setToken }) {
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols(0)
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    email: { type1: false, type2: false },
    userName: false,
    password: { type1: false, type2: false },
  });

  const errorHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        if (value === "") {
          error.email.type1 = true;
        } else if (value !== "") {
          error.email.type1 = false;
        }

        if (!re.test(value)) {
          error.email.type2 = true;
        } else if (re.test(value)) {
          error.email.type2 = false;
        }
        break;

      case "userName":
        if (value === "") {
          error.userName = true;
        } else if (value !== "") {
          error.userName = false;
        }
        break;

      case "password":
        if (value === "") {
          error.password.type1 = true;
        } else if (value !== "") {
          error.password.type1 = false;
        }

        if (!schema.validate(value)) {
          error.password.type2 = true;
        } else if (schema.validate(value)) {
          error.password.type2 = false;
        }
        break;
      default:
        break;
    }
  };

  const handleClick = async (e) => {
    if (userData.email === "") {
      error.email.type1 = true;
      setError({ ...error, email: { ...error.email, type1: true } });
    }

    if (userData.password === "") {
      error.password.type1 = true;
      setError({ ...error, password: { ...error.password, type1: true } });
    }

    if (type === "SignIn") {
      if (
        error.email.type1 !== true &&
        error.email.type2 !== true &&
        error.password.type1 !== true &&
        error.password.type2 !== true
      ) {
        const res = dispatch(SignInUser(userData, history));
        const token = await loginUser(userData);
        console.log(token);
        setToken(token);
        localStorage.setItem("tok", JSON.stringify(token));
      }
    } else {
      if (userData.userName === "") {
        error.userName = true;
        setError({ ...error, userName: true });
      }
      if (
        error.userName !== true &&
        error.email.type1 !== true &&
        error.email.type2 !== true &&
        error.password.type1 !== true &&
        error.password.type2 !== true
      )
        dispatch(SignUpUser(userData, history));
      console.log(userData);
    }
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    setUserData((prevVal) => {
      return { ...prevVal, [name]: value };
    });

    errorHandler(e);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    dispatch(GoogleSignIn(result, history));
    const token = await loginUser(userData);
    console.log(token);
    setToken(token);
    localStorage.setItem("tok", JSON.stringify(token));
  };

  const googleFailure = () => {
    console.log("Error during google sign in");
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <CssBaseline />
        <div
          style={{ padding: type === "SignUp" ? "15px" : "22px" }}
          className={classes.paper}
        >
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
              color="secondary"
              value={userData.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            {error.email.type1 ? <span>This is a required field! </span> : null}
            {error.email.type2 ? (
              <span>Please enter a valid email ID ! </span>
            ) : null}

            {type === "SignUp" ? (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
                  color="secondary"
                  fullWidth
                  value={userData.userName}
                  id="userName"
                  label="Username"
                  name="userName"
                />
                {error.userName ? (
                  <span>This is a required field! </span>
                ) : null}
              </>
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={userData.password}
              required
              color="secondary"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            {error.password.type1 ? (
              <span>This is a required field! </span>
            ) : null}
            {error.password.type2 ? (
              <span>Please enter a strong password ! </span>
            ) : null}

            {/* <p className={classes.error}>{error}</p> */}
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={handleClick}
            >
              {type === "SignIn" ? "Sign In to Bingo" : "Sign Up on Bingo"}
            </Button>
            <Grid container>
              {type === "SignIn" ? (
                <Grid item xs>
                  <Link href="#" className={classes.link} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              ) : null}
              {type === "SignIn" ? (
                <Link className={classes.link} href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              ) : (
                <Link
                  href="/SignIn"
                  style={{ margin: "auto" }}
                  className={classes.link}
                >
                  {"Already a User Sign In !!"}
                </Link>
              )}
            </Grid>
          </div>
          <p style={{ color: "#673ab7", padding: "6px" }}> OR </p>
          <GoogleLogin
            clientId="453680329284-9t4ic7kq6krkfgqnabl6tsnak2r63ldq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.google}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};
