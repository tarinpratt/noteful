import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import SideBar from './sideBar'

describe(`SideBar component`, () => {
const props = {
folders: [
  {
    id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Important"
  },
  {
    id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Super"
  },
  {
    id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Spangley"
  }
]
}

it('renders Folders', () => {
  const wrapper = shallow(<SideBar />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders Folders list w/ props', () => {
  const ul = shallow(<SideBar {...props} />)
  expect(toJson(ul)).toMatchSnapshot()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
    <SideBar />
    </BrowserRouter>, 
  div
  )
  ReactDOM.unmountComponentAtNode(div);
})
})