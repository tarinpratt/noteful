import React from 'react';
import Note from '../note/note';
import './noteContent.css';
import PropTypes from 'prop-types';
import StoreContext from '../storeContext';
import { findNote } from '../helpers';


export default class NoteContent extends React.Component {
    static contextType = StoreContext;
    render() {
            const { notes= [] } = this.context
            const {noteId} = this.props.match.params;
            const note = findNote(notes, noteId) || { content: '' };
        
        return <div className='selectedNote'>
            <Note 
            id={note.id}
            name={note.name}
            modified={note.modified}
            /> 
            <div className='noteContent'>
                {note.content.split(/\n \r|\n/).map((text, i) =>
                <p key={i}>{text}</p>)}
            </div>
        </div>
    }
}

NoteContent.defaultProps = {
    match: {
      params: {}
    }
  }
  NoteContent.propType = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        noteId: PropTypes.string,
      }).isRequired,
  }).isRequired
   

}