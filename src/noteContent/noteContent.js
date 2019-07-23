import React from 'react';
import Note from '../note/note';
import './noteContent.css';
import StoreContext from '../storeContext';
import { findNote } from '../helpers';


export default class NoteContent extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
  
    static contextType = StoreContext;
    render() {
            const { notes= [] } = this.context
            const {noteId} = this.props.match.params;
            const note = findNote(notes, noteId) || { content: '' };
         console.log('notecontent', note)
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