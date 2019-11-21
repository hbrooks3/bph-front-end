import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './view/App';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

// actions
import { checkSession } from './actions/auth';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware,logger),
);

store.dispatch(checkSession());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
