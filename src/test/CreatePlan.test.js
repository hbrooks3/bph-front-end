import React from 'react';
import ReactDOM from 'react-dom';
import CreatePlan from '../view/CreatePlan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatePlan />, div);
  ReactDOM.unmountComponentAtNode(div);
});