import React from 'react';
import ReactDOM from 'react-dom';

import { OnlineContactProvider } from './Contexts/OnlineContactProvider';
import { ContactsProvider } from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';
import { ActiveConversationIdProvider } from './Contexts/ActiveConversationIdProvider';
import { SocketProvider } from './Contexts/SocketProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
	<SocketProvider>
		<OnlineContactProvider>
			<ContactsProvider>
				<ConversationsProvider>
					<ActiveConversationIdProvider>
						<App />
					</ActiveConversationIdProvider>
				</ConversationsProvider>
			</ContactsProvider>
		</OnlineContactProvider>
	</SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);