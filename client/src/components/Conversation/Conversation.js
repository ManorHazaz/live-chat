import './Conversation.css';

import { useRef } from 'react';
import Message from './Components/Message';

function Conversation({ onlineContact, contacts, activeConversation, addMessage }) {

    const newMessageContentRef = useRef();

    function conversationName()
    {
        if( activeConversation.participents[0] === onlineContact.id )
        {
            return activeConversation.participents[1];
        }
        return activeConversation.participents[0];
    }

    function sendMessage( e )
    {
        e.preventDefault();

        addMessage( activeConversation.id , newMessageContentRef.current.value );
        newMessageContentRef.current.value = '';
    }

    return (
        <div className='conversation'>

            <div className='title'>
                <h2> { conversationName() } </h2>
            </div>
            <div className='messages'>
                { activeConversation.messages.map(( message, index ) =>
                    (
                        message.from === onlineContact.id
                        ? <Message key={ index } type={'sent'} message={ message } />
                        : <Message key={ index } type={'received'} message={ message } />
                    )
                )}
                { console.log( activeConversation ) }
            </div>
            <div className='add-message'>
                <input type='text' ref={ newMessageContentRef } className='text-input' placeholder='new message'/>
                <input type='submit' className='btn' value='Send' onClick={ (e) => sendMessage( e ) }/>
            </div>
            
        </div>
    )
}

export default Conversation
