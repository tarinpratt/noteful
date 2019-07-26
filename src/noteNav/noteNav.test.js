import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import NoteNav from './noteNav'

describe(`NoteNav component`, () => {
  const props = {
    folder: {
      "name": "Important"
    }
  }

  it('renders Note Navigation', () => {
    const wrapper = shallow(<NoteNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a title with folder name', () => {
    const h3 = shallow(<NoteNav {...props} />)
      .find('.NotePageNav__folder-name')
    expect(toJson(h3)).toMatchSnapshot()
  })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
    <NoteNav />
    </BrowserRouter>, 
  div
  )
  ReactDOM.unmountComponentAtNode(div);
})

})