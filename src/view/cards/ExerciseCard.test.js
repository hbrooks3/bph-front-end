import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseCard from './ExerciseCard.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';
import {USER_GET, SUCCESS, FAILURE} from '../../actions/users';

const store = createStore(reducer);

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/workout/2"]}>
        <ExerciseCard />
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});