import React from 'react';
import { getUserName } from '../../utils/commonData/common';
import './styles.css';

const MembersInRoom = ({names}) => {
    return (
        <div className="memberContainer">
         <div className="membersHeading">
             <h5>Members in Room</h5>
         </div>
         <div className="membersBlock">
                {names.map((name) => <div>{getUserName() === name.userName ? <div className="player you">You</div> : <div className="player">{name.userName}</div>}</div>  )}           
         </div>
        </div>
    )
}

export default MembersInRoom;