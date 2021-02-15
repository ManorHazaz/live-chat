import './Login.css';

import { useRef } from 'react';

import { v4 as generateId } from 'uuid';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';
import { useSocket } from '../../Contexts/SocketProvider';

function Login() {

    const { contacts, createContact, loginContact } = useContacts();
    const { setOnlineContact } = useOnlineContact();
	const { socket } = useSocket();

    const contactRef = useRef();

    // login contact and create if needed
	const login = ( e ) => {

		e.preventDefault();

			// prevent empty messages
			if( contactRef.current.value.trim() === '' ) 
			{
				contactRef.current.value = '';
				return;
			}

		const contactname = contactRef.current.value;
		const contact = contacts.find( contact => contact.contactName === contactname );
		
		if( contact )
		{
			setOnlineContact( contact );
			socket.emit( 'login-contact', contact.id );
			loginContact( contact.id );
		}
		else
		{
			const newContact = { id: generateId(), contactName: contactname, isOnline: true };
			socket.emit( 'create-contact', newContact );
			createContact( newContact )
			setOnlineContact( newContact );
		}
	}

    return (
        <form className='login' onSubmit={ login } >
            <h1> Live Chat </h1>
		
			<input type='text' autoFocus ref={ contactRef } className='text-input' placeholder='Name' />
			<input type='submit' className='btn' value='Enter' />
		</form>
    )
}
export default Login