import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from '../view/ProfilePage';
import { createStore, applyMiddleware } from 'redux';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';


const store = createStore(reducer);

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
    <MemoryRouter initialEntries={["/profile/2"]}>
      <ProfilePage/>
    </MemoryRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});