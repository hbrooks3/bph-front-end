import React from 'react';
import ReactDOM from 'react-dom';
import PlansPage from '../view/PlansPage';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';


const store = createStore(reducer);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
    <MemoryRouter initialEntries={["/users/2"]}>
      <PlansPage props={'id'}/>
    </MemoryRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});