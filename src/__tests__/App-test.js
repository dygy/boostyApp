/**
 * @format
 */

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
configure({adapter: new Adapter()});
describe('indirectly testing "incrementCounter" through click simulation', () => {
  it('should update the count by 1 when invoked by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('counter')).toBe(0);
    console.log(wrapper);
    wrapper.find('Button').first().props().onPress();
    expect(wrapper.state('counter')).toBe(1);
  });
  it('should add two to the count when the "two" value is true', () => {
    const wrapper = shallow(<App two />);
    expect(wrapper.state('counter')).toBe(0);
    wrapper.find('Button').first().props().onPress();
    expect(wrapper.state('counter')).toBe(2);
  });
});
