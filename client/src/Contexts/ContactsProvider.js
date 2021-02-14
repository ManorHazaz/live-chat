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

    function logoutContact( contactId )
    {
		setContacts((prev) =>
			prev.map(({ id, isOnline, ...rest }) => 
			({
				...rest, id,
				isOnline: id === contactId ? false :isOnline
			}))
		)
    }

    function loginContact( contactId )
    {
		setContacts((prev) =>
			prev.map(({ id, isOnline, ...rest }) => 
			({
				...rest, id,
				isOnline: id === contactId ? true :isOnline
			}))
		)
    }
    

    return (
        <ContactsContext.Provider value={{ contacts, setContacts, createContact, logoutContact, loginContact }}>
            { children }
        </ContactsContext.Provider>
    )
}
