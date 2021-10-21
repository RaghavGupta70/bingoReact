import react,{useEffect, useState} from 'react';
import chatStyles from './chatBoxGame.module.css';

const ChatBox = ({text,message}) => {

    var [newText,setNewText] = useState(message[0].numbers);

    useEffect(() => {
        newText = message[0].numbers;
        console.log(newText)
        setNewText(message[0].numbers)
    })
    
    console.log(message[0].numbers);
    return (
        <div className={chatStyles.mainCont}>
            <div className={chatStyles.header}>
                <h1>{text}</h1>
            </div>
            <div className={chatStyles.content}>
                <ul>
                {newText.map((newT)=>(<li>
                    {newT.userName} cuts {newT.value}
                </li>))}
                </ul>
            </div>
        </div>
    )
}

export default ChatBox;