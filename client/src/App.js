import './App.css';
import soundEffect from './static/sound-effect/incoming-message.wav';

import { useEffect, useState } from 'react';

import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

import { useOnlineContact } from './Contexts/OnlineContactProvider';
import { useContacts } from './Contexts/ContactsProvider';
import { useConversations } from './Contexts/ConversationsProvider';
import { useSocket } from './Contexts/SocketProvider';


function App() {

	const { onlineContact } = useOnlineContact();
	const { setContacts, createContact, loginContact, logoutContact } = useContacts();
	const { setConversations, createConversation, addMessage } = useConversations();
	const { socket } = useSocket();

	const audio = new Audio ( soundEffect );

	useEffect( () => {

		if( onlineContact != null )
		{
			window.addEventListener( 'visibilitychange', () => {

				// handle contact offline
				if( document.visibilityState === 'hidden' )
				{
					socket.emit( 'logout-contact', onlineContact.id );
					logoutContact( onlineContact.id );
				}

				// handle contact online
				else if( document.visibilityState === 'visible' )
				{
					socket.emit( 'login-contact', onlineContact.id );
					loginContact( onlineContact.id );
				}
			
			});
		}
	}, [ onlineContact ] );

	function newMessageSoundEffect()
	{
		if( document.visibilityState === 'hidden' )
		{
			audio.play();
		}
	}


	useEffect( () => {

		// get contacts from server
		socket.on( 'get-contacts', ( contacts ) => {
			setContacts( contacts );
		} );

		// listen and get new contact
		socket.on('created-contact', createContact );

		// listen and get conversations
		socket.on( 'get-conversations', ( conversations ) => {
			setConversations( conversations );
		} );

		// listen and get new conversation
		socket.on('created-conversation', createConversation );

		// listen and get new message
		socket.on('receive-message', ( data ) => {
			addMessage( data.conversationId, data.newMessage );
			newMessageSoundEffect();
		})

		// listen and get new message
		socket.on('loggedin-contact', ( contacId ) => {
			loginContact( contacId );
		})

		// listen and get new message
		socket.on('loggedout-contact', ( contacId ) => {
			logoutContact( contacId );
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