import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import StoreContext from '../storeContext';
import config from '../config';
import './note.css';

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = StoreContext;

  handleDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
 
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)  
      })
      .catch(error => {
        console.error({error});
    
    });
  }
  render(){


     return <li className='noteList' key={this.props.id}>
           <h2 className='noteTitle'>
             <Link to={`/note/${this.props.id}`}>
              {this.props.name}
              </Link>
              </h2>
             <div className='noteDate'>
               Date modified on  {format(this.props.modified, 'Do MMM YYYY')}
               </div> 
              <button className='deleteButton'
              type='button'
              onClick={this.handleDelete}>
                Delete Note</button> 
          </li>
  }
}
