import React ,{ useContext, useState } from 'react';

const ContactsContext = React.createContext();

export function useContacts()
{
    return useContext( ContactsContext );
}

export function ContactsProvider({ children }) {
    const [ contacts, setContacts ] = useState([]);
    
    function createContact( newContact )
    {
        setContacts(prevContacts => 
        {
            return [...prevContacts, newContact]
        });
    }
    

    return (
        <ContactsContext.Provider value={{ contacts, setContacts, createContact }}>
            { children }
        </ContactsContext.Provider>
    )
}
