import React from 'react'

import { useContacts } from '../../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../../Contexts/OnlineContactProvider';
import { useConversations } from '../../../Contexts/ConversationsProvider';
import { useActiveConversationId } from '../../../Contexts/ActiveConversationIdProvider';
import { useSocket } from '../../../Contexts/SocketProvider';

import { v4 as generateId } from 'uuid';

function Contacts() {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { conversations, createConversation } = useConversations();
    const { setActiveConversationId } = useActiveConversationId();
    const { socket } = useSocket();

    function activateConversation( contactId )
    {
		const conversation = conversations.find( conversation => conversation.participents.includes( onlineContact.id ) && conversation.participents.includes( contactId ) );

		if( conversation )
		{
            setActiveConversationId( conversation.id );
		}
		else
		{
            const newConversation = { id: generateId(), participents: [ onlineContact.id , contactId ], messages: [] };
            socket.emit( 'create-conversation', newConversation );
            createConversation( newConversation );
            setActiveConversationId( newConversation.id );
		}
    }

    return (
        <div className='contacts'>
            { contacts.map( contact =>
                (
                    contact.id !== onlineContact.id &&
                    <div key={ contact.id } className='contact' onClick={ () => activateConversation( contact.id ) } >
                        { contact.contactName }
                    </div>
                )
            )}
        </div>
    )
}

export default Contacts
