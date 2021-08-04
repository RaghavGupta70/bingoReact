import React,{useState,useEffect} from "react";
import {withRouter,
Switch,
Link,
Route,useHistory,useLocation} from "react-router-dom";

import Auth from "./components/Authentication/auth.jsx";
import Home from "./components/main/home/home";
import Room from "./components/Rooms/PlayRoom/room.js";

const App = () => {

   const history = useHistory(); 
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tok")));
  let location = useLocation();

    return (
        <Switch>
            <Route path="/SignIn"><Auth type={"SignIn"} setToken={setToken} /></Route>
            <Route path="/SignUp"><Auth type={"SignUp"} setToken={setToken} /></Route>
            <Route path="/Home"><Home token={token} /></Route>
            <Route path="/Room"><><Room />{console.log(location)}</></Route>
        </Switch>
    )
}

export default withRouter(App);