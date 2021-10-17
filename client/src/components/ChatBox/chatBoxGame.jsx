import react,{useEffect, useState} from 'react';
import chatStyles from './chatBoxGame.module.css';

const ChatBox = ({text,message}) => {

    const [newText,setNewText] = useState([{Message:"Player 1 joined",type: 'user'},{Message:"Player 2 joined",type: 'other'},{Message:"Player 3 joined",type: 'other'},{Message: "Player 4 joined",type: 'other'}]);
    console.log(message);
    return (
        <div className={chatStyles.mainCont}>
            <div className={chatStyles.header}>
                <h1>{text}</h1>
            </div>
            <div className={chatStyles.content}>
                <ul>
                {message.length > 0 && message.map((newT)=>(<li className={newT.type==='user'?chatStyles.message:chatStyles.message1}>
                    {newT.userName} cuts {newT.value}
                </li>))}
                </ul>
            </div>
        </div>
    )
}

export default ChatBox;