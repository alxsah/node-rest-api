import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import BookingDialog from './BookingDialog';

test('Component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookingDialog />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('areFieldsMissing returns true if descriptionInput is blank', () => {
  const bookingDialog = shallow(<BookingDialog />);
  const instance = bookingDialog.dive().instance();
  instance.descriptionInput = {
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
  const bookingDialog = shallow(<BookingDialog />);
  const instance = bookingDialog.dive().instance();
  instance.descriptionInput = {
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

test('areFieldsMissing returns false if nameInput and descriptionInput are populated', () => {
  const bookingDialog = shallow(<BookingDialog />);
  const instance = bookingDialog.dive().instance();
  instance.descriptionInput = {
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