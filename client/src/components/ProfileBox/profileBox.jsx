import React from 'react';
import './profile.css';
import { Avatar } from '@material-ui/core';

const ProfileBox = () => {
    return(
        <div className="profile__box">
           <div className="info">
               <h2>My Profile</h2>
               <span>Name:</span><span>Rohit Bhalla</span>
           </div>
           <div className="profile_img">
              <Avatar>R</Avatar>
           </div>
        </div>
    )
}

export default ProfileBox;