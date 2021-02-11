import './Conversation.css';

import { useRef } from 'react';

import Message from './Components/Message';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';
import { useConversations } from '../../Contexts/ConversationsProvider';
import { useActiveConversationId } from '../../Contexts/ActiveConversationIdProvider';
import { useSocket } from '../../Contexts/SocketProvider';

function Conversation() {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { conversations, addMessage } = useConversations();
    const { activeConversationId } = useActiveConversationId();
    const { socket } = useSocket();

    const newMessageContentRef = useRef();

    const activeConversation = conversations.find( conversation => conversation.id == activeConversationId  )

    // get the title from participents in conversation
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

    // create new message and send to server
    function sendMessage()
    {
        const newMessage = { from: onlineContact, content: newMessageContentRef.current.value };
        socket.emit( 'add-message', { conversationID: activeConversation.id ,newMessage: newMessage } );
        addMessage( activeConversation.id , newMessage );
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
                        message.from.id === onlineContact.id
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