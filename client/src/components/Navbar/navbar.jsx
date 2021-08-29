import React from 'react';
import NavStyles from './navbar.module.css';

const Navbar = ({personChar}) => {

  return (
    <>
    <div className={NavStyles.main_container}>
      <div className={NavStyles.leftArea}>
        <h1>Bingo Game</h1>
      </div>

      <div className={NavStyles.rightArea}>
        <div className={NavStyles.leader}>
          <button>LeaderBoard</button>
        </div>
        <div className={NavStyles.profile}>
          <button>
            My Profile
          </button>
        </div>
        <div className={NavStyles.logout}>
          <button>
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar;