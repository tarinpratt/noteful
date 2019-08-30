import React from 'react';
import StoreContext from '../storeContext';
import ValidationError from '../validationError';
import config from '../config';
import './addNote.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note_name: {
                value: '',
                touched: false
            },
            note_content: {
                value: '',
                touched: false
            },
            folder_id: {
              value: 1
             
            }


        }
      }
  static contextType = StoreContext;

  updateName(name) {
    this.setState({note_name: {value: name, touched: true}});
  }

  updateContent(content) {
    this.setState({note_content: {value: content, touched: true}});
  }

  updateFolderId(folder_id) {
  
    this.setState({folder_id: {value: folder_id}});
  }
  
  validateName() {
    const name = this.state.note_name.value.trim();
    if (name.length < 1) {
      return '* Name is required *';
    } 
  }
  validateContent() {
    const content = this.state.note_content.value.trim();
    if (content.length < 1) {
      return '* Content is required *';
    } 
  }

handleSubmit = event => {
    event.preventDefault()
   
    const addedNote = {
        note_name: this.state.note_name.value,
        note_content: this.state.note_content.value,
        folder_id: this.state.folder_id.value,
        date_modified: new Date()
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
    console.log(this.state.folder_id)
    const { folders=[] } = this.context

    return <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
    <h2>Add Note</h2> 
    <section className="form-group">
      <label htmlFor="name">Name</label>
      <input 
      type="text" 
      className="noteName"
      name="note_name" 
      id="note_name"
      aria-label="Name title for added note"
      aria-required="true"
      onChange={e => this.updateName(e.target.value)}/>
        {this.state.note_name.touched && (
  <ValidationError message={this.validateName()} />
)}
    </section>
    <section className="form-group">
       <label htmlFor="content">Content</label>
       <input 
       type="text" 
       className="noteContent"
       name="note_content" 
       id="note_content"
       aria-label="Content for added note"
       aria-required="true" onChange={e => this.updateContent(e.target.value)}/>
            {this.state.note_content.touched && (
  <ValidationError message={this.validateContent()} />
)}
   </section>
   <section className="form-group">
       <label htmlFor="folderClass">Folder</label>
       <select 
       type="text"
       id="folder_id" 
       name="folder_id"
       aria-label="Folder to file added note under"
       aria-required="true" 
       onChange={e => this.updateFolderId(e.target.value)}>
           {folders.map((folder) => 
            <option key={folder.id} value={folder.id} >
                {folder.folder_name}
            </option>
            )}
       </select>
   </section>
     <button type="submit" className="addNoteButton"
     disabled={
        this.validateName() ||
        this.validateContent()}>
         Add Note
     </button>
  </form>
  }
}
