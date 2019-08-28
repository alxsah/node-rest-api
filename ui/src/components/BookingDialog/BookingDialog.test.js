import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import BookingDialog from './BookingDialog';

test('Component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookingDialog open={true}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('areFieldsMissing returns true if locationInput is blank', () => {
  const bookingDialog = shallow(<BookingDialog open={true}/>);
  const instance = bookingDialog.dive().instance();
  instance.locationInput = {
    current: {
      value: ''
    }
  };
  instance.nameInput = {
    current: {
      value: 'test'
    }
  };
  expect(instance.areFieldsMissing()).toEqual(true);
});

test('areFieldsMissing returns true if nameInput is blank', () => {
  const bookingDialog = shallow(<BookingDialog open={true}/>);
  const instance = bookingDialog.dive().instance();
  instance.locationInput = {
    current: {
      value: 'test'
    }
  };
  instance.nameInput = {
    current: {
      value: ''
    }
  };
  expect(instance.areFieldsMissing()).toEqual(true);
});

test('areFieldsMissing returns false if nameInput and locationInput are populated', () => {
  const bookingDialog = shallow(<BookingDialog open={true}/>);
  const instance = bookingDialog.dive().instance();
  instance.locationInput = {
    current: {
      value: 'test'
    }
  };
  instance.nameInput = {
    current: {
      value: 'test'
    }
  };
  expect(instance.areFieldsMissing()).toEqual(false);
});