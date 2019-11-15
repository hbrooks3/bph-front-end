import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutCard from '../view/cards/WorkoutCard.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';
import { useHistory } from 'react-router-dom';



const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <WorkoutCard />
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});


