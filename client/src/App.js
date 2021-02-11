import './App.css';
import { useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

import { useOnlineContact } from './Contexts/OnlineContactProvider';
import { useContacts } from './Contexts/ContactsProvider';
import { useSocket } from './Contexts/SocketProvider';




function App() {

	const { onlineContact } = useOnlineContact();
	const { contacts, setContacts, createContact } = useContacts();
	const { socket } = useSocket();

		// join room & fetch messages on mount
		useEffect( () => {
			socket.on( 'get-contacts', ( contacts ) => {
				setContacts( contacts );
			} );

			socket.on('created-contact', createContact );

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
