import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	const [ contacts, setContacts ] = useLocalStorage('contacts', []);
	const [ messeges, setMesseges ] = useLocalStorage('messeges', []);
	const [ onlineUser, setOnlineUser ] = useState();

	function loginUser( username )
	{
		setOnlineUser( username );
		if( !contacts.includes( username ) )
		{
			setContacts( prevContacts => [ ...prevContacts, username ] );
		}
	}

	function addMessege( to, content )
	{
		const newMessege = { from: onlineUser, to: to, content: content }
		setMesseges( prevMesseges => [ ...prevMesseges, newMessege ] );
	}

	return (
		<div className="App">
			{ !onlineUser
			? <Login loginUser={ loginUser } />
			: <Dashboard onlineUser={ onlineUser } contacts={ contacts } addMessege={ addMessege } />
			}
					{console.log(messeges)}
		</div>
	);
}

export default App;
