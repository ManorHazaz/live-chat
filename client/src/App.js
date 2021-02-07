import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';

function App() {
	const [ contacts, setContacts ] = useState();
	const [ onlineUser, setOnlineUser ] = useState();

	function loginUser( username )
	{
		setContacts({ ...contacts, username: username });
		setOnlineUser( username );
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
