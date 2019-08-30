import React from 'react';
import StoreContext from '../storeContext';
import ValidationError from '../validationError';
import config from '../config';
import './addFolder.css';

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder_name: {
                value: '',
                touched: false
            },
        }
      }
    
  static contextType = StoreContext;

  updateName(name) {
    this.setState({folder_name: {value: name, touched: true}});
  }
  
  validateName() {
    const name = this.state.folder_name.value.trim();
    if (name.length < 1) {
      return '* Name is required *';
    } 
  }

handleSubmit = event => {
event.preventDefault()
const addedFolder = {
    folder_name: this.state.folder_name.value,
}


fetch(`${config.API_ENDPOINT}/folders`, {
  method: 'POST',
  body: JSON.stringify(addedFolder),
  headers: {
    'content-type': 'application/json'
  },
})
  .then(res => {
    if(!res.ok) {
      return res.json().then(error => Promise.reject(error))
  }
    return res.json()
  })
  .then(data => {
      this.context.addFolder(data)
  })
  .catch(error => {
    this.setState({ error })
});

}
  render(){
  
    return <form className="addFolder" onSubmit={event =>this.handleSubmit(event)}>
    <h2>Create a folder</h2> 
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input 
      type="text" 
      className="folderName"
      name="folder_name" 
      id="folder_name"
      aria-label="Name for folder"
      aria-required="true" 
      onChange={e => this.updateName(e.target.value)}/>
        {this.state.folder_name.touched && (
  <ValidationError message={this.validateName()} />
)}
    </div>
     <button type="submit" className="addFolderButton"
      disabled={
        this.validateName()}>
         Add Folder
     </button>
  </form>
  }
}
