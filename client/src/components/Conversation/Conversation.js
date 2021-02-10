import './Conversation.css';

import { useRef } from 'react';
import Message from './Components/Message';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';
import { useConversations } from '../../Contexts/ConversationsProvider';
import { useActiveConversation } from '../../Contexts/ActiveConversationProvider';

function Conversation() {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { addMessage } = useConversations();
    const { activeConversation } = useActiveConversation();

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

    function sendMessage()
    {
        const content = newMessageContentRef.current.value;
        addMessage( onlineContact.id, activeConversation.id , content );
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
                <input type='submit' className='btn' value='Send' onClick={ () => sendMessage() }/>
            </div>
            
        </div>
    )
}

export default Conversation
