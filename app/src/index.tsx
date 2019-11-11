import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
const createBrowserHistory = require("history").createBrowserHistory

import App from './pages/App'
import configureStore from './redux/makeStore'

const history = createBrowserHistory();
const initialState = {};
const store = configureStore(initialState, history);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
       <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);