import React from 'react';
import './noteNav.css';
import { findNote, findFolder } from '../helpers';
import PropTypes from 'prop-types';
import StoreContext from '../storeContext';


export default class NoteNav extends React.Component {

  static contextType = StoreContext;
  render(){
    const {notes, folders} = this.context
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
console.log('notenav', this.props.history)
    return <div className='noteNav'>
        <button className='backButton'
            onClick={() => this.props.history.push('/')}>
                Back
            </button>
            {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  }
}

NoteNav.defaultProps = {
  match: {
    params: {}
  }
}
NoteNav.propType = {
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}