import React from 'react';
import ReactDOM from 'react-dom';
import App from '../view/App';
import Navbar from '../view/Navbar';
import PlansPage from "../view/PlansPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import  { MemoryRouter }  from 'react-router-dom';
import reducer from '../reducers/index.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';

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



Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    addTodo: jest.fn()
  }

  const enzymeWrapper = shallow(<App />)

  return {
    props,
    enzymeWrapper
  }
}

it('should render self and subcomponents', () => {
  const { enzymeWrapper } = setup()

  //expect(enzymeWrapper.find('app').hasClass('app')).toBe(true)
  expect(enzymeWrapper.find(Router).containsMatchingElement(Navbar)).toBe(true);


  // expect(enzymeWrapper.find('h1').text()).toBe('todos')

  // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
  // expect(todoInputProps.newTodo).toBe(true)
  // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
})
