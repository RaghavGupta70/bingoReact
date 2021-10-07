import react,{useState} from 'react';
import chatStyles from './chatBoxGame.module.css';

const ChatBox = ({text}) => {

    const [newText,setNewText] = useState([{Message:"Player 1 joined",type: 'user'},{Message:"Player 2 joined",type: 'other'},{Message:"Player 3 joined",type: 'other'},{Message: "Player 4 joined",type: 'other'}]);

    return (
        <div className={chatStyles.mainCont}>
            <div className={chatStyles.header}>
                <h1>{text}</h1>
            </div>
            <div className={chatStyles.content}>
                <ul>
                {newText.map((newT)=>(<li className={newT.type==='user'?chatStyles.message:chatStyles.message1}>
                    {newT.Message}
                </li>))}
                </ul>
            </div>
        </div>
    )
}

export default ChatBox;