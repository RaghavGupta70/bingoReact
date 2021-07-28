import React,{useState,useEffect} from "react";
import {withRouter,
Switch,
Link,
Route,useHistory} from "react-router-dom";

import Auth from "./components/Authentication/auth.jsx";
import Home from "./components/main/home/home"

const App = () => {

   const history = useHistory(); 
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tok")));

  useEffect(() => {
      history.push("/Home");
  },[])

    return (
        <Switch>
            <Route path="/SignIn"><Auth type={"SignIn"} setToken={setToken} /></Route>
            <Route path="/SignUp"><Auth type={"SignUp"} setToken={setToken} /></Route>
            <Route path="/Home"><Home token={token} /></Route>
        </Switch>
    )
}

export default withRouter(App);