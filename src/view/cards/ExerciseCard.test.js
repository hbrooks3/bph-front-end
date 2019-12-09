import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseCard from './ExerciseCard.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';

const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/users/2"]}>
        <ExerciseCard/>
      </MemoryRouter>
      </Provider>,
    div
  );
});