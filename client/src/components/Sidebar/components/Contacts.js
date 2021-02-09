import React from 'react'

import { v4 as generateId } from 'uuid';

function Contacts({ onlineContact, contacts, conversations, setActiveConversation, setConversations }) {

    function activeateConversation( contactId )
    {
        var found = false;
		// check if contact exist
        if( conversations )
        {
            conversations.forEach( conversation => {
                console.log( conversation.participents )
                if( conversation.participents.includes( onlineContact.id ) && conversation.participents.includes( contactId ) )
                {
                    console.log('in')
                    setActiveConversation( conversation );
                    found = true;
                }			
            });
        }
        

		// TODO change this **** if
		if( !found )
		{
            const newConversation = { id: generateId(), participents: [ onlineContact.id , contactId ], messages: [] };
            setConversations(prevConversations => {
                return [...prevConversations, newConversation]
            });
            setActiveConversation( newConversation );
		}
    }

    return (
        <div className='contacts'>
            { contacts.map( contact =>
                (
                    contact.id !== onlineContact.id &&
                    <div key={ contact.id } className='contact' onClick={ () => activeateConversation( contact.id ) } >
                        { contact.contactName }
                    </div>
                )
            )}
        </div>
    )
}

export default Contacts
