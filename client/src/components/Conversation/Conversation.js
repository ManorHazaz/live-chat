import './Conversation.css';

import { useRef } from 'react';
import Message from './Components/Message';

function Conversation({ onlineContact, conversations, activeConversation, addMessage }) {

    const newMessageContentRef = useRef();

    function sendMessage()
    {
        addMessage( activeConversation, newMessageContentRef.current.value );
        newMessageContentRef.current.value = '';
    }

    return (
        <div className='conversation'>

            <div className='title'>
                <h2> { activeConversation.name } </h2>
            </div>
            <div className='messages'>
                {/* { messages.map(( message, index ) =>
                    (
                        message.from === onlineUser & message.to === contactConversation
                        ? <Message key={ index } type={'sent'} message={ message } />
                        : message.from === contactConversation & message.to === onlineUser
                        ? <Message key={ index } type={'received'} message={ message } />
                        : ''
                    )
                )} */}
            </div>
            <div className='add-message'>
                <input type='text' ref={ newMessageContentRef } className='text-input' placeholder='username'/>
                <input type='submit' className='btn' value='Send' onClick={ () => sendMessage() }/>
            </div>
            
        </div>
    )
}

export default Conversation
