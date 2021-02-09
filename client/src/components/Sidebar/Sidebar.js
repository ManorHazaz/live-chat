import { useState } from 'react'
import Contacts from './components/Contacts';
import './Sidebar.css'

function Sidebar({ onlineContact, contacts, conversations, setActiveConversation, setConversations }) {


    return (
        <div className='sidebar'>
            <h2 className='username'>
                { onlineContact.contactName }
            </h2>
            <Contacts
                onlineContact={ onlineContact }
                contacts={ contacts } 
                onversations={ conversations }
                setActiveConversation={ setActiveConversation }
                setConversations={ setConversations }
            />
        </div>
    )
}

export default Sidebar
