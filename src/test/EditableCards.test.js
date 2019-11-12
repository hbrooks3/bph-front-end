import React from 'react';
import ReactDOM from 'react-dom';
import EditableCards from '../view/EditableCards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditableCards />, div);
  ReactDOM.unmountComponentAtNode(div);
});