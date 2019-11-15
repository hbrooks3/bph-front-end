import React from 'react';
import ReactDOM from 'react-dom';
import RegisterModal from '../view/RegisterModal';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index.js';


const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={store}>
    <RegisterModal />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});