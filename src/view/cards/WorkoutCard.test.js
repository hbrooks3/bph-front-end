import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutCard from './WorkoutCard.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import { useHistory } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';




const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/workout/2"]}>
        <WorkoutCard />
      </MemoryRouter>
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});


