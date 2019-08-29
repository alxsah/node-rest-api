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
  instance.setState({
    selected: ''
  });
  expect(instance.isNothingSelected()).toEqual(true);
});

test('isNothingSelected returns false if "selected" is populated', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abc'
  });
  expect(instance.isNothingSelected()).toEqual(false);
});

test('isSelected returns true if "selected" is the passed ID', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abc'
  });
  expect(instance.isSelected('abc')).toEqual(true);
});

test('isSelected returns false if "selected" is not the passed ID', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abc'
  });
  expect(instance.isSelected('ab')).toEqual(false);
});

test('getSelectedBooking returns the first selected row object', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abc',
    rows: [
      {
        _id: 'abc'
      },
      {
        _id: 'abc2'
      },
    ]
  });
  expect(instance.isSelected('ab')).toEqual(false);
});

test('handleRowClick sets "selected" to an empty string when the selected rowID is passed', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abc'
  });
  instance.handleRowClick('abc')();
expect(instance.state.selected).toEqual('');
});

test('handleRowClick sets "selected" to the passed rowID if they are not equal', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    selected: 'abcde'
  });
  instance.handleRowClick('abc')();
  expect(instance.state.selected).toEqual('abc');
});

test('setDialogState sets "isAddDialogOpen" state to true if dialogType is "Add" and state is "true"', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    isAddDialogOpen: false
  });
  instance.setDialogState('Add', true);
  expect(instance.state.isAddDialogOpen).toBe(true);
});

test('setDialogState sets "isAddDialogOpen" state to false if dialogType is "Add" and state is "false"', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    isAddDialogOpen: true
  });
  instance.setDialogState('Add', false);
  expect(instance.state.isAddDialogOpen).toBe(false);
});

test('setDialogState sets "isEditDialogOpen" state to true if dialogType is "Edit" and state is "true"', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    isEditDialogOpen: false
  });
  instance.setDialogState('Edit', true);
  expect(instance.state.isEditDialogOpen).toBe(true);
});

test('setDialogState sets "isEditDialogOpen" state to false if dialogType is "Edit" and state is "false"', () => {
  const materialTable = shallow(<MaterialTable />);
  const instance = materialTable.dive().instance();
  instance.setState({
    isEditDialogOpen: true
  });
  instance.setDialogState('Edit', false);
  expect(instance.state.isEditDialogOpen).toBe(false);
});