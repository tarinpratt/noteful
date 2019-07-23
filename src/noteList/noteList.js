import React from 'react';
import { Link } from 'react-router-dom';
import { getNotesForFolder } from '../helpers';
import PropTypes from 'prop-types';
import Note from '../note/note';
import './noteList.css';
import StoreContext from '../storeContext';


export default class NoteList extends React.Component {
  
 static contextType = StoreContext;
   
    render(){
    
    const { notes=[] } = this.context
    const {folderId} = this.props.match.params
    const notesForFolder = getNotesForFolder(
          notes,
          folderId
      );
    
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
    NoteList.defaultProps = {
      match: {
        params: {}
      }
    }

    NoteList.propType = {
      match: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired
     
    }