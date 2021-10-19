import React, { useState,useEffect } from 'react';
import './profile.css';
import Image from 'react-bootstrap/Image';
import { MailOutline, Done, FiberManualRecord, Cancel } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RiMedalFill } from 'react-icons/ri';
import { GiPodiumWinner } from 'react-icons/gi';
import { CircularProgress } from '@material-ui/core';
import { updatePlayerImageData } from '../../actions/index.js';
import FileBase from 'react-file-base64';
import { getUserEmail } from '../../utils/commonData/common';

const ProfileBox = ({ data }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const [fileImg,setFileImg] = useState(data.profileImage);
    console.log(data.profileImage)

    const handleChange = ({base64}) => {
        setFileImg(base64);
        dispatch(updatePlayerImageData(getUserEmail(),base64));
        console.log(base64)
    }

    return (
        <>{data.length === 0 ? <CircularProgress /> :
            <div className="profile__box">
                <div className="info">
                    <h1 className="my_profile_text">My Profile</h1>
                    <h2>{data.userName}</h2>
                    <div className="more_info" >
                        <ul>
                            <li>
                                <span><MailOutline style={{ color: '#e50000' }} /></span>
                                <span className="head_text">Email Id: </span>
                                <span className="ans_text">{data.emailId}</span>
                            </li>
                            <li>
                                <span><RiMedalFill style={{ fontSize: '1.5rem', color: 'rgb(227 194 20)' }} /></span>
                                <span className="head_text">Matches Played: </span>
                                <span className="ans_text">{data.matchesPlayed}</span>
                            </li>
                            <li>
                                <span><GiPodiumWinner style={{ fontSize: '1.5rem', color: 'green' }} /></span>
                                <span className="head_text">Matches Won: </span>
                                <span className="ans_text">{data.matchesWon}</span>
                            </li>
                            <li>
                                <span><Cancel style={{ color: 'red' }} /></span>
                                <span className="head_text">Matches Lost: </span>
                                <span className="ans_text">{data.matchesLost}</span>
                            </li>
                            <li>
                                <span><FiberManualRecord style={{ color: data.status === 'Online' ? '#26c126' : 'maroon' }} /></span>
                                <span className="head_text">Status: </span>
                                <span className="ans_text">{data.status}</span>
                            </li>
                            <li>
                                <span><Done style={{ color: 'rgb(103, 58, 183)' }} /></span>
                                <span className="head_text">Registered on : </span>
                                <span className="ans_text">{data.registeredDate.slice(0, 10)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profile_img" xs={6} md={4}>
                    <Image src={fileImg} className="avatar_img" roundedCircle />
                    {/* <AiOutlinePlusCircle /> */}
                    <FileBase type="file" multiple={false}  accept=' .jpeg .png .jpg' className="uploadImg" onDone={handleChange} />
                </div>
            </div>}
        </>
    )
}

export default ProfileBox;