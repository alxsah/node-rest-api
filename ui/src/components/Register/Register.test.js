import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Register from './Register';

test('Component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Register />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('handleBack calls setRegistering prop with value "false"', () => {
  const testFunc = jest.fn(() => {});
  const register = shallow(<Register setRegistering={testFunc} />);
  const instance = register.dive().instance();
  instance.handleBack();
  expect(testFunc).toHaveBeenCalledWith(false);
});

test('getSuccessMessageClass returns "successMessage" class name if "registered" is true and "responseCode" is 200', () => {
  const register = shallow(<Register />);
  const instance = register.dive().instance();
  instance.setState({
    registered: true,
    responseCode: 200
  });
  expect(instance.getSuccessMessageClass()).toEqual(instance.props.classes.successMessage);
});

test('getSuccessMessageClass returns "hidden" class name if "registered" is true and "responseCode" is not 200', () => {
  const register = shallow(<Register />);
  const instance = register.dive().instance();
  instance.setState({
    registered: true,
    responseCode: 500
  });
  expect(instance.getSuccessMessageClass()).toEqual(instance.props.classes.hidden);
});

test('getSuccessMessageClass returns "hidden" class name if "registered" is false and "responseCode" is 200', () => {
  const register = shallow(<Register />);
  const instance = register.dive().instance();
  instance.setState({
    registered: false,
    responseCode: 200
  });
  expect(instance.getSuccessMessageClass()).toEqual(instance.props.classes.hidden);
});

test('getSuccessMessageClass returns "hidden" class name if "registered" is false and "responseCode" is not 200', () => {
  const register = shallow(<Register />);
  const instance = register.dive().instance();
  instance.setState({
    registered: false,
    responseCode: 500
  });
  expect(instance.getSuccessMessageClass()).toEqual(instance.props.classes.hidden);
});