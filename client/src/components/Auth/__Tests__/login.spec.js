import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Login from '../Login';

configure({ adapter: new Adapter() });
describe('Test case for testing login', () => {
  it('Should render without errors', () => {
    const component = shallow(<Login />);
    expect(component.length).equal(1);
  });
});
