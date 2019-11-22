import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './LoginModal.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';
import auth from '../reducers/auth.js';


const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <LoginModal />
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <LoginModal state={auth.isFetching} />
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});