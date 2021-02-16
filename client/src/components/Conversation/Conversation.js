import './Conversation.css';

import { useRef, useEffect } from 'react';

import Message from './Components/Message';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';
import { useConversations } from '../../Contexts/ConversationsProvider';
import { useActiveConversationId } from '../../Contexts/ActiveConversationIdProvider';
import { useSocket } from '../../Contexts/SocketProvider';

function Conversation({ toggleSidebar }) {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { conversations, addMessage } = useConversations();
    const { activeConversationId } = useActiveConversationId();
    const { socket } = useSocket();

    const newMessageContentRef = useRef();
    const lastMessageRef = useRef();

    const activeConversation = conversations.find( conversation => conversation.id == activeConversationId );

    useEffect(() => 
    {
        if( lastMessageRef.current && window.innerWidth > 600  )
        {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
        else if( lastMessageRef.current && !toggleSidebar )
        {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
         
    },[ lastMessageRef.current ]);

    // get the title from participents in conversation
    function conversationTitle()
    {
        var id;
        
        if( activeConversation.participents[0].id === onlineContact.id )
        {
            id = activeConversation.participents[1].id;
        }
        else
        {
            id = activeConversation.participents[0].id;
        }

        const  index = contacts.findIndex( contact => contact.id === id );
        return <div className='title'>
                <h2>{ contacts[index].contactName }</h2>
                <span> { contacts[index].isOnline? 'Online': 'Offline' } </span>
                </div>;
    }

    // create new message and send to server
    const sendMessage = ( e ) => 
    {
		e.preventDefault();

        // prevent empty messages
        if( newMessageContentRef.current.value.trim() === '' ) 
        {
            newMessageContentRef.current.value = '';
            return;
        }

        const newMessage = { from: onlineContact.id, content: newMessageContentRef.current.value, time: Date.now() };
        socket.emit( 'add-message', { conversationId: activeConversation.id ,newMessage: newMessage } );
        addMessage( activeConversation.id , newMessage );
        newMessageContentRef.current.value = '';
    }

    return (
        <div className='conversation'>
            { conversationTitle() }
            <div className='messages'>
                { activeConversation.messages.map(( message, index ) =>
                    {
                        const lastMessage = ( activeConversation.messages.length - 1 ) === index;
                        const typeOfMessage = message.from == onlineContact.id ? 'sent' : 'received';
                        return <Message key={ index } reference={ lastMessage ? lastMessageRef : null } type={ typeOfMessage } message={ message } />
                    }
                )}
            </div>
            <form className='add-message' onSubmit={ sendMessage } >
                <input type='text' autoFocus ref={ newMessageContentRef } className='text-input' placeholder='New Message'/>
                <input type='submit' className='btn' value='Send'/>
            </form>
        </div>
    )
}
export default Conversation