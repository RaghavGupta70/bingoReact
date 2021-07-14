import React from "react";
import {BrowserRouter as Router,
Switch,
Link,
Route} from "react-router-dom";

import Auth from "./components/Authentication/auth.jsx";

const App = () => {
    return (
    <Router>
        <Switch>
            <Route path="/SignIn"><Auth type={"SignIn"}/></Route>
            <Route path="/SignUp"><Auth type={"SignUp"}/></Route>
            <Route path="/Home"><h1>Hello</h1></Route>
        </Switch>
    </Router>)
}

export default App;