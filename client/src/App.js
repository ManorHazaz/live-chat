import './App.css';
import { useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

import { useOnlineContact } from './Contexts/OnlineContactProvider';
import { useContacts } from './Contexts/ContactsProvider';
import { useConversations } from './Contexts/ConversationsProvider';
import { useSocket } from './Contexts/SocketProvider';




function App() {

	const { onlineContact } = useOnlineContact();
	const { contacts, setContacts, createContact } = useContacts();
	const { conversations, setConversations, createConversation } = useConversations();
	const { socket } = useSocket();

		// join room & fetch messages on mount
		useEffect( () => {
			socket.on( 'get-contacts', ( contacts ) => {
				setContacts( contacts );
			} );

			socket.on('created-contact', createContact );

			socket.on( 'get-conversations', ( conversations ) => {
				setConversations( conversations );
				console.log( 'conversations: ', conversations )
			} );

			socket.on('created-conversation', (data) =>  {
				createConversation( data );
				console.log( data )
			});

			// close connection on unmount
			return () => {
				socket.disconnect()
			};
		}, [] );

	return (
		<div className="App">
			{ !onlineContact
			? <Login />
			: <Dashboard />
			}
		</div>
	);
}

export default App;
