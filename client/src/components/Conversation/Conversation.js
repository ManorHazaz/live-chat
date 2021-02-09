import './Conversation.css';

import { useRef } from 'react';
import Message from './Components/Message';

function Conversation({ onlineContact, contacts, activeConversation, addMessage }) {

    const newMessageContentRef = useRef();

    function conversationTitle()
    {
        var id;
        
        if( activeConversation.participents[0] === onlineContact.id )
        {
            id = activeConversation.participents[1];
        }
        else
        {
            id = activeConversation.participents[0];
        }

        const  index = contacts.findIndex( contact => contact.id === id );
        return contacts[index].contactName;
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
                <h2> { conversationTitle() } </h2>
            </div>
            <div className='messages'>
                { activeConversation.messages.map(( message, index ) =>
                    (
                        message.from === onlineContact.id
                        ? <Message key={ index } type={'sent'} message={ message } />
                        : <Message key={ index } type={'received'} message={ message } />
                    )
                )}
            </div>
            <div className='add-message'>
                <input type='text' ref={ newMessageContentRef } className='text-input' placeholder='new message'/>
                <input type='submit' className='btn' value='Send' onClick={ (e) => sendMessage( e ) }/>
            </div>
            
        </div>
    )
}

export default Conversation
