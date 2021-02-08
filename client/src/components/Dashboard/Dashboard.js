import { useState, useEffect } from 'react'
import { Conversation } from '../Conversation'
import { Sidebar } from '../Sidebar'
import './Dashboard.css'

function Dashboard({ onlineContact, contacts, conversations, createConversation, addMessage }) {

    const [ activeConversation, setActiveConversation ] = useState();

    useEffect(() => 
    {
        if( conversations )
        setActiveConversation( conversations[0] )
    }
    , [])


    return (
        <div className='dashboard'>
            <Sidebar 
                onlineContact={ onlineContact } 
                contacts={ contacts } 
                createConversation={ createConversation } 
            />
            
            { activeConversation != null
                ? <Conversation 
                    onlineContact={ onlineContact }  
                    conversations={ conversations } 
                    activeConversation={ activeConversation } 
                    addMessage={ addMessage } 
                />
                : <div>
                    <h1> There are no conversations </h1>
                </div>
            }
        </div>
    )
}

export default Dashboard
