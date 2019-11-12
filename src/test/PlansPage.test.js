import React from 'react';
import ReactDOM from 'react-dom';
import PlansPage from '../view/PlansPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlansPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});