import react,{useState} from 'react';
import chatStyles from './chatBoxGame.module.css';

const ChatBox = ({text}) => {

    const [newText,setNewText] = useState(["Player 1 joined","Player 2 joined","Player 3 joined","Player 4 joined"]);

    return (
        <div className={chatStyles.mainCont}>
            <div className={chatStyles.header}>
                <h1>{text}</h1>
            </div>
            <div className={chatStyles.content}>
                <ul>
                {newText.map((newT)=>(<li>
                    {newT}
                </li>))}
                </ul>
            </div>
        </div>
    )
}

export default ChatBox;