import React from 'react';
import NavStyles from './navbar.module.css';
import CustomizedButtons from '../Buttons/NavbarButtons/commonButton';
import LogoutButton from '../Buttons/LogOut/Logout';
import { useHistory } from 'react-router';
import logo from '../../assets/images/bingoLogo.gif';

const Navbar = ({personChar}) => {

  const history = useHistory();
  const handleLeader = (e) => {
    history.push('/leaderBoard');
  }

    const handleProfile = (e) => {
      history.push("/profile");
    };

  return (
    <>
    <div className={NavStyles.main_container}>
      <div className={NavStyles.leftArea}>
        <img src={logo} />
      </div>

      <div className={NavStyles.rightArea}>
        <div className={NavStyles.leader}>
          <CustomizedButtons heading={"LeaderBoard"} onClick = {handleLeader} />
        </div>
        <div className={NavStyles.profile}>
          <CustomizedButtons heading={"My Profile"} onClick = {handleProfile} />
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