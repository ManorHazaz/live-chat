import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

import { v4 as generateId } from 'uuid';

function App() {

	const [ contacts, setContacts ] = useLocalStorage('contacts', []);
	const [ conversations, setConversations ] = useLocalStorage( 'conversations', [])
	const [ onlineContact, setOnlineContact ] = useState();

	// login contact and add to contacts if not exist
	function loginContact( contactname )
	{
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
			setContacts([ ...contacts, newContact ]);
			setOnlineContact( newContact );
		}
	}
	
	// add message to conversation
	function addMessage( conversation, content )
	{

		const newMessage = [{ from: onlineContact.id, content: content }];
		setConversations(( prev ) =>
			prev.map(({ id, messages, ...rest }) => 
			({
				...rest, id,
				messages: id == conversation ? ([ ...messages , ...newMessage ]) : messages
			}))
		);
	}

	return (
		<div className="App">
			{ !onlineContact
			? <Login loginContact={ loginContact } />
			: <Dashboard 
				onlineContact={ onlineContact } 
				contacts={ contacts } 
				conversations={ conversations } 
				setConversations={ setConversations } 
				addMessage={ addMessage } 
			/>
			}
		</div>
	);
}

export default App;
