import React from 'react';
import './styles.css';

const MembersInRoom = () => {
    return (
        <div className="memberContainer">
         <div className="membersHeading">
             <h5>Members in Room</h5>
         </div>
         <div className="membersBlock">
             <div className="player">Player 1</div>
             <div className="player">Player 2</div>
             <div className="player">Player 3</div>
             <div className="player">Player 4</div>
         </div>
        </div>
    )
}

export default MembersInRoom;