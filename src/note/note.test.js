import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import Note from './Note'



describe(`Note component`, () => {
 

  it('renders a Note', () => {
    const wrapper = shallow(<Note />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
    <Note />
    </BrowserRouter>, 
  div
  )
  ReactDOM.unmountComponentAtNode(div);
})

})