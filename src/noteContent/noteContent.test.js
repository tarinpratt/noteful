import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NoteContent from './noteContent'


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

