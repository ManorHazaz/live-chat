import React ,{ useContext, useState } from 'react';

const OnlineContactContext = React.createContext();

export function useOnlineContact()
{
    return useContext( OnlineContactContext );
}

export function OnlineContactProvider({ children }) {
    const [ onlineContact, setOnlineContact ] = useState();

    return (
        <OnlineContactContext.Provider value={{ onlineContact, setOnlineContact }}>
            { children }
        </OnlineContactContext.Provider>
    )
}
