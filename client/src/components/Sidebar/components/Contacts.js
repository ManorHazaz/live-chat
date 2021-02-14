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
    const { conversations, createConversation } = useConversations();
    const { activeConversationId, setActiveConversationId } = useActiveConversationId();
    const { socket } = useSocket();

    const [ lastContactId, setLastContactId ] = useState(1);
    
    // set activeConversationId and create conversation if needed
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

        setLastContactId( contactId );
    }

    return (
        <div className='contacts'>
            { contacts.map( contact =>
                (
                    contact.id !== onlineContact.id &&
                    <div key={ contact.id } className={`contact ${ contact.id == lastContactId ? 'active' :'' }`} onClick={ () => activateConversation( contact.id ) } >
                        { contact.contactName }
                        <span className={ `online online-${ contact.isOnline }` } ></span>
                    </div>
                )
            )}
        </div>
    )
}
export default Contacts