import React from 'react';
import './profile.css';
import Image from 'react-bootstrap/Image';
import bingo_bg from '../../assets/images/bingo_bg.png';
import {MailOutline,Done,FiberManualRecord,Cancel} from '@material-ui/icons';
import { RiMedalFill } from 'react-icons/ri';
import { GiPodiumWinner } from 'react-icons/gi';
import { useDispatch } from 'react-redux';

const ProfileBox = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const registeredDate = new Date(user.result.time)
    return (
        <div className="profile__box">
            <div className="info">
                <h1 className="my_profile_text">My Profile</h1>
                <h2>{user.result.userName}</h2>
                <div className="more_info" >
                    <ul>
                        <li>
                            <span><MailOutline/></span>
                            <span className="head_text">Email Id: </span>
                            <span className="ans_text">{user.result.email}</span>
                        </li>
                        <li>
                            <span><RiMedalFill style={{fontSize:'1.5rem'}} /></span>
                            <span className="head_text">Matches Played: </span>
                            <span className="ans_text">45</span>
                        </li>
                        <li>
                            <span><GiPodiumWinner style={{fontSize:'1.5rem'}} /></span>
                            <span className="head_text">Matches Won: </span>
                            <span className="ans_text">32</span>
                        </li>
                        <li>
                            <span><Cancel /></span>
                            <span className="head_text">Matches Lost: </span>
                            <span className="ans_text">12</span>
                        </li>
                        <li>
                            <span><FiberManualRecord /></span>
                            <span className="head_text">Status: </span>
                            <span className="ans_text">Online</span>
                        </li>
                        <li>
                            <span><Done /></span>
                            <span className="head_text">Registered on : </span>
                            <span className="ans_text">{registeredDate.toLocaleDateString()}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile_img" xs={6} md={4}>
                <Image src={bingo_bg} className="avatar_img" roundedCircle />
            </div>
        </div>
    )
}

export default ProfileBox;