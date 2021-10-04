import React, { useState, useEffect } from "react";
import {
  withRouter,
  Switch,
  Link,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

import Auth from "./pages/Auth/auth";
import Home from "./pages/Home/home";
import Room from "./pages/BingoGame/room.js";
import LeaderBoard from "./pages/LeaderBoard/leaderBoard.js";
import Profile from "./pages/Profile/Profile.js";
import Navbar from "./components/Navbar/navbar.jsx";
import AppStyles from "./App.module.css";
import { getToken } from "./utils/commonData/common.js";
import FooterPage from './components/Footer/footer.jsx';

const App = () => {
  const history = useHistory();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tok")));
  let location = useLocation();
  console.log(history.location.pathname!=='SignIn');

  return (
    <>
      {getToken() !== null &&
      history.location.pathname !== "/SignIn" &&
      history.location.pathname !== "/SignUp" ? (
        <div className={AppStyles.navbar}>
          <Navbar />
        </div>
      ) : null}

      <Switch>
        <Route path="/SignIn">
          <Auth type={"SignIn"} setToken={setToken} />
        </Route>
        <Route path="/SignUp">
          <Auth type={"SignUp"} setToken={setToken} />
        </Route>
        <Route path="/Home">
          <Home token={token} />
        </Route>
        <Route path="/Room">
          <>
            <Room />
            {console.log(location)}
          </>
        </Route>
        <Route path="/leaderBoard">
          <LeaderBoard />
        </Route>
        <Route path="/Profile">
          <Profile />
        </Route>
      </Switch>
      {getToken() !== null &&
      history.location.pathname !== "/SignIn" &&
      history.location.pathname !== "/SignUp" ? (
        <div className={AppStyles.footer}>
          <FooterPage />
        </div>
      ) : null}
    </>
  );
};

export default withRouter(App);
