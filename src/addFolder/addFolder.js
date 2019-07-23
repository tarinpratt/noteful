import React from 'react';
import StoreContext from '../storeContext';
import config from '../config';
import './addFolder.css';



export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
      }
    
  static contextType = StoreContext;

handleSubmit = event => {
event.preventDefault()
const addedFolder = {
    name: this.nameInput.current.value,
}
console.log('added folder', addedFolder)

fetch(`${config.API_ENDPOINT}/folders`, {
  method: 'POST',
  body: JSON.stringify(addedFolder),
  headers: {
    'content-type': 'application/json'
  },
})
  .then(res => {
    if(!res.ok)
      return res.json().then(err => {
        console.log(err)
        throw err
  })
    return res.json()
  })
  .then(data => {
      this.context.addFolder(data)
  })
  .catch(error => {
    console.error({error});

});

}
  render(){
    
    return <form className="addFolder" onSubmit={event =>this.handleSubmit(event)}>
    <h2>Create a folder</h2> 
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" className="folderName"
        name="name" id="name" ref={this.nameInput}/>
    </div>
     <button type="submit" className="addFolderButton">
         Add Folder
     </button>
  </form>
  }
}