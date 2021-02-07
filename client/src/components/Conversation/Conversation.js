import './Conversation.css';

import { useRef } from 'react';

function Conversation({ onlineUser, contactConversation, addMessege }) {

    const newMessegeContentRef = useRef();

    function sendMessege()
    {
        addMessege( contactConversation, newMessegeContentRef.current.value );
    }

    return (
        <div className='conversation'>

            <div className='title'>
                <h2> { contactConversation } </h2>
            </div>
            <div className='messeges'>

            </div>
            <div className='add-messege'>
                <input type='text' ref={ newMessegeContentRef } className='text-input' placeholder='username'/>
                <input type='submit' className='btn' value='Send' onClick={ () => sendMessege() }/>
            </div>
            
        </div>
    )
}

export default Conversation
