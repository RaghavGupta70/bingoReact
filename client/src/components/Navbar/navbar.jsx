import React from 'react';
import NavStyles from './navbar.module.css';
import CustomizedButtons from '../Buttons/NavbarButtons/commonButton';
import LogoutButton from '../Buttons/LogOut/Logout';
import { useHistory,useLocation } from 'react-router';
import logo from '../../assets/images/bingoLogo.gif';

const Navbar = ({personChar}) => {

  const history = useHistory();
  const location = useLocation();

  const handleNavButton1 = (e) => {
    if(location.pathname==='/leaderBoard')
    {
      history.push('/home');
    }

    else
    {
    history.push("/leaderBoard");
    }
  }

    const handleNavButton2 = (e) => {
  if (location.pathname === "/profile") {
    history.push("/home");
  } else {
    history.push("/profile");
  }    };

  return (
    <>
    <div className={NavStyles.main_container}>
      <div className={NavStyles.leftArea}>
        <img src={logo} />
      </div>

      <div className={NavStyles.rightArea}>
        <div className={NavStyles.leader}>
          <CustomizedButtons heading={location.pathname !=='/leaderBoard'?"LeaderBoard":"Home"} onClick = {handleNavButton1} />
        </div>
        <div className={NavStyles.profile}>
          <CustomizedButtons heading={location.pathname !=='/profile'?"My Profile":"Home"} onClick = {handleNavButton2} />
        </div>
        <div className={NavStyles.logout}>
         <LogoutButton />
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar;