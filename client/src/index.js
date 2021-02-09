import React from 'react';
import ReactDOM from 'react-dom';

import { OnlineContactProvider } from './Contexts/OnlineContactProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <OnlineContactProvider>
      <App />
    </OnlineContactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);