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
	const { conversations, setConversations, createConversation, addMessage } = useConversations();
	const { socket } = useSocket();

		// join room & fetch messages on mount
		useEffect( () => {
			socket.on( 'get-contacts', ( contacts ) => {
				setContacts( contacts );
			} );

			socket.on('created-contact', createContact );

			socket.on( 'get-conversations', ( conversations ) => {
				setConversations( conversations );
			} );

			socket.on('created-conversation', createConversation );

			
			socket.on('receive-message', (data) => {
				addMessage( data.conversationID, data.newMessage );
			})

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
