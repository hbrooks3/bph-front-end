import React from 'react';
import ReactDOM from 'react-dom';
import App, {PrivateRoute} from '../view/App';
import Navbar from '../view/Navbar';
import ProfilePage from "../view/ProfilePage";
import HomePage from "../view/HomePage";
import PlansPage from "../view/PlansPage";
import WorkoutPage from "../view/WorkoutPage";
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

//--------------------------------------------------------------------------------------------------------------------------------



xit('should create an action to add a todo', () => {
  // const text = 'Finish docs'
  // const expectedAction = {
  //   type: types.ADD_TODO,
  //   text
  // }
  expect(PrivateRoute('/profile').exists()).toBe(true);
});

//--------------------------------------------------------------------------------------------------------------------------------


Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
  }

  const enzymeWrapper = shallow(<App />)

  return {
    props,
    enzymeWrapper
  }
}

it('should render self and subcomponents', () => {
  const { enzymeWrapper } = setup()
  
  expect(enzymeWrapper.find(Router).exists()).toBe(true);
  expect(enzymeWrapper.find(Navbar).exists()).toBe(true);
  expect(enzymeWrapper.find(ProfilePage).exists()).toBe(true);
  expect(enzymeWrapper.find(PlansPage).exists()).toBe(true);
  expect(enzymeWrapper.find(HomePage).exists()).toBe(true);
  expect(enzymeWrapper.find(WorkoutPage).exists()).toBe(true);

  expect(enzymeWrapper.find('badRoute').exists()).toBe(false);

})

//--------------------------------------------------------------------------------------------------------------------------------

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = action => thunk(store)(next)(action)

  return { store, next, invoke }
}

it('passes through non-function action', () => {
  const { next, invoke } = create()
  const action = { type: 'TEST' }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})

it('calls the function', () => {
  const { invoke } = create()
  const fn = jest.fn()
  invoke(fn)
  expect(fn).toHaveBeenCalled()
})

it('passes dispatch and getState', () => {
  const { store, invoke } = create()
  invoke((dispatch, getState) => {
    dispatch('TEST DISPATCH')
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
  expect(store.getState).toHaveBeenCalled()
})