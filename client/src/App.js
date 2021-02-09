import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

import { useOnlineContact } from './Contexts/OnlineContactProvider';

import { ContactsProvider } from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';
import { ActiveConversationProvider } from './Contexts/ActiveConversationProvider';

function App() {

	const { onlineContact } = useOnlineContact();

	return (
		<div className="App">
			<ContactsProvider>
				<ConversationsProvider>
					<ActiveConversationProvider>
						{ !onlineContact
						? <Login />
						: <Dashboard />
						}
					</ActiveConversationProvider>
				</ConversationsProvider>
			</ContactsProvider>
		</div>
	);
}

export default App;
