import React from 'react';
import './styles.css';

const MembersInRoom = ({names}) => {
    return (
        <div className="memberContainer">
         <div className="membersHeading">
             <h5>Members in Room</h5>
         </div>
         <div className="membersBlock">
                {names.map((name) => <div className="player">{name.userName}</div>  )}           
         </div>
        </div>
    )
}

export default MembersInRoom;