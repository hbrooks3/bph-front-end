import React from 'react';
import ReactDOM from 'react-dom';
import App from '../view/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-redux';
import reducer from '../reducers/index.js';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  reducer,
//  applyMiddleware(thunkMiddleware,logger),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <App />
      </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={['App/plans']}>
//         <App />
//       </MemoryRouter>
//     </Provider>,
//     div
//   );
//   ReactDOM.unmountComponentAtNode(div);
// });