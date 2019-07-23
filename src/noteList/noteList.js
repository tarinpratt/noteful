import React from 'react';
import { Link } from 'react-router-dom';
import { getNotesForFolder } from '../helpers';
import Note from '../note/note';
import './noteList.css';
import StoreContext from '../storeContext';


export default class NoteList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
 static contextType = StoreContext;
   
    render(){
    
    const { notes=[] } = this.context
    const {folderId} = this.props.match.params
    const notesForFolder = getNotesForFolder(
          notes,
          folderId
      );
     console.log('notes', notes)
  return <ul className='noteList_List'>
      {notesForFolder.map((note) => 
      
        <Note 
        key={note.id}
        {...note}
      />
    
    
      )}
      <Link to='/add-note'>
        <button className='addNote'
        >
          Add Note
        </button>
      </Link>
      </ul>
      }
    }
