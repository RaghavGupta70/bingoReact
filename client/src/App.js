import React,{useState} from "react";
import {BrowserRouter as Router,
Switch,
Link,
Route} from "react-router-dom";

import Auth from "./components/Authentication/auth.jsx";
import Home from "./components/main/home/home"

const App = () => {

    
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tok")));

    return (
    <Router>
        <Switch>
            <Route path="/SignIn"><Auth type={"SignIn"} setToken={setToken} /></Route>
            <Route path="/SignUp"><Auth type={"SignUp"} setToken={setToken} /></Route>
            <Route path="/Home"><Home token={token} /></Route>
        </Switch>
    </Router>)
}

export default App;