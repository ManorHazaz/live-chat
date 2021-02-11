import React ,{ useContext, useCallback, useState } from 'react';

const ConversationsContext = React.createContext();

export function useConversations()
{
    return useContext( ConversationsContext );
}

export function ConversationsProvider({ children }) {
    const [ conversations, setConversations ] = useState([]);

    function addMessageToConversation( conversationID, newMessage )
    {
    }
    
    // create new conversation
    function createConversation( newConversation )
    {
        setConversations(prevConversation => 
        {
            return [...prevConversation, newConversation]
        });
    }

    // add message to conversation
    function addMessage( conversationID, newMessage )
	{
        setConversations(( prevConversations ) =>
            prevConversations.map(({ id, messages, ...rest }) => 
            ({
                ...rest, id,
                messages: id == conversationID ? ([ ...messages , newMessage ]) : messages
            }))
        );
	}

    return (
        <ConversationsContext.Provider value={{ conversations, setConversations, createConversation, addMessage }}>
            { children }
        </ConversationsContext.Provider>
    )
}