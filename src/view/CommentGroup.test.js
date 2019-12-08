import React from 'react';
import ReactDOM from 'react-dom';
import CommentGroup from './CommentGroup';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';

const store = createStore(
    reducer,
  //  applyMiddleware(thunkMiddleware,logger),
  );

xit('renders without crashing', () => {
    const comment = {};
    
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/workout/2"]}>
          <CommentGroup comment='test' id='testID' dispatch='true' prop4='test'/>
        </MemoryRouter>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
