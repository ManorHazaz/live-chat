import React, { useState } from 'react';

import { v4 as generateId } from 'uuid';

import { useContacts } from '../../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../../Contexts/OnlineContactProvider';
import { useConversations } from '../../../Contexts/ConversationsProvider';
import { useActiveConversationId } from '../../../Contexts/ActiveConversationIdProvider';
import { useSocket } from '../../../Contexts/SocketProvider';

function Contacts() {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { conversations, createConversation, readAll } = useConversations();
    const { activeConversationId, setActiveConversationId } = useActiveConversationId();
    const { socket } = useSocket();

    const [ lastContactId, setLastContactId ] = useState(1);

    function findConversation( contactId )
    {
        const conversation = conversations.find( c => 
        {
            if(c.participents[0].id == onlineContact.id && c.participents[1].id == contactId )
            {
                return true;
            }

            if(c.participents[1].id == onlineContact.id && c.participents[0].id == contactId )
            {
                return true;
            }
            return false;
        });

        return conversation;
    }
    
    // set activeConversationId and create conversation if needed
    function activateConversation( contactId )
    {
        let conversation = findConversation( contactId );

		if( !conversation )
		{
            conversation = { 
                id: generateId(), 
                participents: 
                [
                    { id: onlineContact.id, unreadMessagesCounter: 0 },
                    { id: contactId, unreadMessagesCounter: 0 }
                ], 
                messages: [] };
                
            socket.emit( 'create-conversation', conversation );
            createConversation( conversation );
		}

        setActiveConversationId( conversation.id );
        setLastContactId( contactId );
        readAll( activeConversationId, onlineContact.id );
    }

    return (
        <div className='contacts'>
            { contacts.map( contact =>
                {
                    const conversation = findConversation( contact.id );
                    let messagesToRead;

                    if( conversation )
                    {
                        if( conversation.participents[0].id == contact.id )
                        {
                            messagesToRead = conversation.participents[0].unreadMessagesCounter;
                        }
                        else
                        {
                            messagesToRead = conversation.participents[1].unreadMessagesCounter;
                        }
                    }
                    
                    return contact.id !== onlineContact.id &&
                    <div key={ contact.id } className={`contact ${ contact.id == lastContactId ? 'active' :'' }`} onClick={ () => activateConversation( contact.id ) } >
                        { contact.contactName }
                        <span className={`messages-to-read ${ messagesToRead ? messagesToRead > 0 && 'display' :'' }`}>{ messagesToRead ? messagesToRead > 0 && messagesToRead : '' }</span>
                        <span className={ `online online-${ contact.isOnline }` } ></span>
                    </div>
                }
            )}
        </div>
    )
}
export default Contacts