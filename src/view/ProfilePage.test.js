import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from './ProfilePage';
import { createStore, applyMiddleware } from 'redux';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';


const store = createStore(reducer);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/users/2"]}>
        <ProfilePage/>
      </MemoryRouter>
      </Provider>,
    div
  );
});