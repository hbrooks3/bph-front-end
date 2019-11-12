import React from 'react';
import ReactDOM from 'react-dom';
import RegisterModal from '../view/RegisterModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});