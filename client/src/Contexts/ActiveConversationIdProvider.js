import React ,{ useContext, useState } from 'react';

const ActiveConversationIdContext = React.createContext();

export function useActiveConversationId()
{
    return useContext( ActiveConversationIdContext );
}

export function ActiveConversationIdProvider({ children }) {
    const [ activeConversationId, setActiveConversationId ] = useState();

    return (
        <ActiveConversationIdContext.Provider value={{ activeConversationId, setActiveConversationId }}>
            { children }
        </ActiveConversationIdContext.Provider>
    )
}
