import './Login.css';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';

import { useRef } from 'react';

import { v4 as generateId } from 'uuid';

function Login() {

    const { contacts, createContact } = useContacts();
    const { setOnlineContact } = useOnlineContact();

    const contactRef = useRef();

    // login contact and add to contacts if not exist
	function loginContact()
	{
        const contactname = contactRef.current.value;
		var found = false;

		// check if contact exist
		contacts.forEach( contact => {
			if( contact.contactName === contactname )
			{
				setOnlineContact( contact );
				found = true;
			}			
		});

		// TODO change this **** if
		if( !found )
		{
            const generatedId = generateId();
            const newContact = { id: generatedId, contactName: contactname };
			createContact( newContact )
			setOnlineContact( newContact );
		}
	}

    return (
        <div className='login'>
            <h1> Live Chat </h1>
            <input type='text' ref={ contactRef } className='text-input' placeholder='Name'/>
            <input type='submit' className='btn' value='Enter chat' onClick={ () => loginContact() }/>
        </div>
    )
}

export default Login
