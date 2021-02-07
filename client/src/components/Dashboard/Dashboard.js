import { useState } from 'react'
import { Conversation } from '../Conversation'
import { Sidebar } from '../Sidebar'
import './Dashboard.css'

function Dashboard({ contacts, onlineUser, addMessege }) {
    const [ contactConversation, setContactConversation ] = useState( contacts[0] );

    return (
        <div className='dashboard'>
            <Sidebar onlineUser={ onlineUser } contacts={contacts} />
            <Conversation onlineUser={ onlineUser } contactConversation={ contactConversation } addMessege={ addMessege } />
        </div>
    )
}

export default Dashboard
