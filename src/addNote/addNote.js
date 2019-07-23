import React from 'react';
import StoreContext from '../storeContext';
import PropTypes from 'prop-types';
import ValidationError from '../validationError';
import config from '../config';
import './addNote.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            }

        }
      }
  static contextType = StoreContext;

  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  updateContent(content) {
    this.setState({content: {value: content, touched: true}});
  }
  
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length < 1) {
      return '* Name is required *';
    } 
  }
  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length < 1) {
      return '* Content is required *';
    } 
  }

handleSubmit = event => {
    event.preventDefault()
    const addedNote = {
        name: this.state.name.value,
        content: this.state.content.value,
        folderId: event.target.folderClassId.value,
        modified: new Date()
    }
  

   fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(addedNote),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(data => {
        this.context.addNote(data)
    })
    .catch(error => {
        this.setState({ error })
    });
}
  render(){
    const { folders=[] } = this.context

    return <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
    <h2>Add Note</h2> 
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" className="noteName"
        name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
        {this.state.name.touched && (
  <ValidationError message={this.validateName()} />
)}
    </div>
    <div className="form-group">
       <label htmlFor="content">Content</label>
       <input type="text" className="noteContent"
        name="content" id="content" onChange={e => this.updateContent(e.target.value)}/>
            {this.state.content.touched && (
  <ValidationError message={this.validateContent()} />
)}
   </div>
   <div className="form-group">
       <label htmlFor="folderClass">Folder</label>
       <select id="folderClassId" name="folderClassId" >
           {folders.map((folder) => 
            <option key={folder.id} value={folder.id}>
                {folder.name}
            </option>
            )}
       </select>
   </div>
     <button type="submit" className="addNoteButton"
     disabled={
        this.validateName() ||
        this.validateContent()}>
         Add Note
     </button>
  </form>
  }
}

AddNote.PropType = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}