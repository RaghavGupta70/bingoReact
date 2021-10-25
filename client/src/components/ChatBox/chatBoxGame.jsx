import react,{useEffect,useRef, useState} from 'react';
import { getUserName, getUsers } from '../../utils/commonData/common';
import chatStyles from './chatBoxGame.module.css';

const ChatBox = ({text,message}) => {

    var [newText,setNewText] = useState(message[0].numbers);
    const messageScroll = useRef(null);

    useEffect(() => {
        newText = message[0].numbers;
        setNewText(getUsers()[0].numbers)
    })

    useEffect(() => {
        if (messageScroll) {
            messageScroll.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])
    
    return (
        <div className={chatStyles.mainCont}>
            <div className={chatStyles.header}>
                <h1>{text}</h1>
            </div>
            <div className={chatStyles.content}>
                <ul className={chatStyles.chatHead} ref={messageScroll}>
                    {newText.length > 0 ? newText.map((newT) => (<li className={getUserName() === newT.userName ? chatStyles.chat : chatStyles.chat2}>
                        {newT.userName} {newT.value===100?"Won":`cuts ${newT.value}`}
                    </li>)):<h5 style={{color: 'red',margin: 'auto'}}>Game hasn't started yet</h5>}
                </ul>
            </div>
        </div>
    )
}

export default ChatBox;