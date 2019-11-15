import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseCard from '../view/cards/ExerciseCard.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';


const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <ExerciseCard />
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});