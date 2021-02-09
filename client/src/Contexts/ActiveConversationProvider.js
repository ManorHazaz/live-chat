import React ,{ useContext, useState } from 'react';

const ActiveConversationContext = React.createContext();

export function useActiveConversation()
{
    return useContext( ActiveConversationContext );
}

export function ActiveConversationProvider({ children }) {
    const [ activeConversation, setActiveConversation ] = useState();

    return (
        <ActiveConversationContext.Provider value={{ activeConversation, setActiveConversation }}>
            { children }
        </ActiveConversationContext.Provider>
    )
}
