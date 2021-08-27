import React from 'react';

import ReactDOM from 'react-dom';

import App from '@/App';

import '@/cssReset.css';
import { UserProvider } from './contexts/user';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
