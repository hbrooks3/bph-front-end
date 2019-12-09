import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutCard from './WorkoutCard.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import { useHistory } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
import * as WorkoutCardActions from './WorkoutCard.js';




const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/workout/2"]}>
        <WorkoutCard />
      </MemoryRouter>
      </Provider>,
    div
  );
});

// it('returns fetching card', () =>{
//   //const account = {auth: {users: {123: {accountType: 0, loaded: true}} }}
//   expect(WorkoutCardActions.EditableCard()
// })


