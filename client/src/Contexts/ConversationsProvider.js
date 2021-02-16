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
            prev.map(({ id, messages, participents }) => 
            ({
                id,
                messages: id == conversationId ? ([ ...messages, newMessage ]) : messages,
                participents: id == conversationId 
                ? participents.map(({ id, unreadMessagesCounter }) => 
                ({
                    id,
                    unreadMessagesCounter: id == newMessage.from ? unreadMessagesCounter + 1 :unreadMessagesCounter
                }))
                : participents
            }))
        );
	}

    // contact read all messages
    function readAll( conversationId, contactId )
    {
        setConversations(( prev ) =>
            prev.map(({ id, participents, ...rest }) => 
            ({
                ...rest, id,
                participents: id == conversationId 
                ? participents.map(({ id, unreadMessagesCounter }) => 
                ({
                    id,
                    unreadMessagesCounter: id != contactId ? 0 :unreadMessagesCounter
                }))
                : participents
            }))
        );
    }

    return (
        <ConversationsContext.Provider value={{ conversations, setConversations, createConversation, addMessage, readAll }}>
            { children }
        </ConversationsContext.Provider>
    )
}