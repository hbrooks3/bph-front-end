import React from 'react';
import ReactDOM from 'react-dom';
import FetchingCard from './FetchingCard.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';


()=>{}

const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/users/2"]}>
        <FetchingCard props={'users', 'id', ()=>{}, 'dismissError'}/>
      </MemoryRouter>
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});