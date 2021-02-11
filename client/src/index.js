import React from 'react';
import ReactDOM from 'react-dom';

import { OnlineContactProvider } from './Contexts/OnlineContactProvider';

import { ContactsProvider } from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';
import { ActiveConversationProvider } from './Contexts/ActiveConversationProvider';
import { SocketProvider } from './Contexts/SocketProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
	<SocketProvider>
		<OnlineContactProvider>
			<ContactsProvider>
				<ConversationsProvider>
					<ActiveConversationProvider>
						<App />
					</ActiveConversationProvider>
				</ConversationsProvider>
			</ContactsProvider>
		</OnlineContactProvider>
	</SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);