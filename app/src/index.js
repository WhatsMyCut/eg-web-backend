import 'semantic-ui-css/semantic.min.css';
import './assets/line-awesome/css/line-awesome-semantic-font-awesome.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import client from './Apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require('dotenv').config('../../.env');

let Application = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(Application, document.getElementById('root'));
registerServiceWorker();
