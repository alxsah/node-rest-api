import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MaterialTable from './MaterialTable';

test('Component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MaterialTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('isNothingSelected returns true if "selected" is empty', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.state = {
    selected: ''
  }
  expect(instance.isNothingSelected()).toEqual(true);
});

test('isNothingSelected returns false if "selected" is populated', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.state = {
    selected: 'abc'
  }
  expect(instance.isNothingSelected()).toEqual(false);
});

test('isSelected returns true if "selected" is the passed ID', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.state = {
    selected: 'abc'
  }
  expect(instance.isSelected('abc')).toEqual(true);
});

test('isSelected returns false if "selected" is not the passed ID', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.state = {
    selected: 'abc'
  }
  expect(instance.isSelected('ab')).toEqual(false);
});

test('getSelectedBooking returns the first selected row object', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.state = {
    selected: 'abc',
    rows: [
      {
        _id: 'abc'
      },
      {
        _id: 'abc2'
      },
    ]
  }
  expect(instance.isSelected('ab')).toEqual(false);
});
