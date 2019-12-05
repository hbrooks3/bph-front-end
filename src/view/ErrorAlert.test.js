import React from 'react';
import ReactDOM from 'react-dom';
import ErrorAlert from './ErrorAlert.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ErrorAlert
      heading='There was an error!'
      message='You messed up dude.'
      callback={()=>console.log('Error alert closed')}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});