import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import NoteContent from './noteContent'

describe(`NoteContent component`, () => {
const props = {
  content: "Voluptates sunt eligendi",
  folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
  id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
  modified: "2019-01-03T00:00:00.000Z",
  name: "Dogs"
}

it('renders Note Content', () => {
  const wrapper = shallow(<NoteContent />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders a Note with note prop', () => {
  const note = shallow(<NoteContent {...props} />)
    .find('Note')
  expect(toJson(note)).toMatchSnapshot()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
    <NoteContent />
    </BrowserRouter>, 
  div
  )
  ReactDOM.unmountComponentAtNode(div);
})

})