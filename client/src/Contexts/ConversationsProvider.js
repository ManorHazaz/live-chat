import React ,{ useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ConversationsContext = React.createContext();

export function useConversations()
{
    return useContext( ConversationsContext );
}

export function ConversationsProvider({ children }) {
    const [ conversations, setConversations ] = useLocalStorage('conversations', []);
    
    // create new conversation
    function createConversation( newConversation )
    {
        setConversations([...conversations, newConversation]);
    }

    // add message to conversation
    function addMessage( onlineContact, conversationID, content )
	{
		const newMessage = [{ from: onlineContact, content: content }];
		setConversations(( prev ) =>
			prev.map(({ id, messages, ...rest }) => 
			({
				...rest, id,
				messages: id == conversationID ? ([ ...messages , ...newMessage ]) : messages
			}))
		);
	}

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation, addMessage }}>
            { children }
        </ConversationsContext.Provider>
    )
}