import React ,{ useContext, useState } from 'react';

const ConversationsContext = React.createContext();

export function useConversations()
{
    return useContext( ConversationsContext );
}

export function ConversationsProvider({ children }) {
    const [ conversations, setConversations ] = useState([]);

    // create new conversation
    function createConversation( newConversation )
    {
        setConversations(prevConversation => 
        {
            return [...prevConversation, newConversation]
        });
    }

    // add message to conversation
    function addMessage( conversationId, newMessage )
	{
        setConversations(( prev ) =>
            prev.map(({ id, messages, ...rest }) => 
            ({
                ...rest, id,
                messages: id == conversationId ? [ ...messages, newMessage ] : messages
            }))
        );

        console.log( conversations )
	}

    return (
        <ConversationsContext.Provider value={{ conversations, setConversations, createConversation, addMessage }}>
            { children }
        </ConversationsContext.Provider>
    )
}