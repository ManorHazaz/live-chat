import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	const [ contacts, setContacts ] = useLocalStorage('contacts', []);
	const [ onlineUser, setOnlineUser ] = useState();

	function loginUser( username )
	{
		setOnlineUser( username );
		if( !contacts.includes( username ) )
		{
			setContacts( prevContacts => [ ...prevContacts, username ] );
		}
	}

	return (
		<div className="App">
			{ !onlineUser
			? <Login loginUser={ loginUser } />
			: <Dashboard onlineUser={ onlineUser } contacts={ contacts }/>
			}
		</div>
	);
}

export default App;
