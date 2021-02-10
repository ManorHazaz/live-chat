import React from 'react'

import { useContacts } from '../../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../../Contexts/OnlineContactProvider';
import { useConversations } from '../../../Contexts/ConversationsProvider';
import { useActiveConversation } from '../../../Contexts/ActiveConversationProvider';

import { v4 as generateId } from 'uuid';

function Contacts() {

    const { contacts } = useContacts();
    const { onlineContact } = useOnlineContact();
    const { conversations, createConversation } = useConversations();
    const { setActiveConversation } = useActiveConversation();

    function activateConversation( contactId )
    {
		const conversation = conversations.find( conversation => conversation.participents.includes( onlineContact.id ) && conversation.participents.includes( contactId ) );

		if( conversation )
		{
            setActiveConversation( conversation );
		}
		else
		{
            const newConversation = { id: generateId(), participents: [ onlineContact.id , contactId ], messages: [] };
            createConversation( newConversation );
            setActiveConversation( newConversation );
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
