import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import NoteContent from './noteContent'

describe(`NoteContent component`, () => {

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