import React from 'react';
import StoreContext from '../storeContext';
import config from '../config';
import './addNote.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.contentInput = React.createRef();
      }
  static contextType = StoreContext;

handleSubmit = event => {
    event.preventDefault()
    const addedNote = {
        name: this.nameInput.current.value,
        content: this.contentInput.current.value,
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
        console.error({error});

    });
}
  render(){
    const { folders=[] } = this.context
  console.log(this.context)
    return <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
    <h2>Add Note</h2> 
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" className="noteName"
        name="name" id="name" ref={this.nameInput}/>
    </div>
    <div className="form-group">
       <label htmlFor="content">Content</label>
       <input type="text" className="noteContent"
        name="content" id="content" ref={this.contentInput}/>
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
     <button type="submit" className="addNoteButton">
         Add Note
     </button>
  </form>
  }
}