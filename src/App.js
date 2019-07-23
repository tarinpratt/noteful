import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from './sideBar/sideBar';
import NoteList from './noteList/noteList';
import NoteContent from './noteContent/noteContent';
import NoteNav from './noteNav/noteNav';
import AddNote from './addNote/addNote';
import AddFolder from './addFolder/addFolder';
import StoreContext from './storeContext';
import ErrorHandler from './errorHandler/errorHandler';
import config from './config';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: []
      };
      }
  
  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
    ])
        .then(([notesRes, foldersRes]) => {
            
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));
                
           return Promise.all([notesRes.json(), foldersRes.json()]);
            
        })

        .then(([myNotes, myFolders]) => {
        this.setState({notes: myNotes, folders: myFolders})
        
        })
        .catch(error => {
            this.setState({ error })
        });
        
        
}
handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};
handleAddFolder = folder => {
    this.setState({
        folders: [
            ...this.state.folders,
            folder
        ]
    })
};
handleAddNote = note => {
    this.setState({
        notes: [
            ...this.state.notes,
            note
        ]
    })
};


    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={SideBar}
                    />
                ))}
                <Route 
                path="/note/:noteId" 
                component={NoteNav} />
                <Route
                path="/add-note"
                component={NoteNav} />
                <Route
                path="/add-folder"
                component={NoteNav} />
               
            </>
        );
    }

renderMainRoutes() {
 
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteList}
            
                />
            ))}
            <Route
                path="/note/:noteId"
                component={NoteContent}
            />
            <Route
                path="/add-note"
                component={AddNote} />
            <Route
                path="/add-folder"
                component={AddFolder} />
        </>
    );
}

render() {
    const contextValue = {
    notes: this.state.notes,
    folders: this.state.folders,
    deleteNote: this.handleDeleteNote,
    addNote: this.handleAddNote,
    addFolder: this.handleAddFolder
    }
    console.log('STATE', this.state)
  return (
      <StoreContext.Provider value={contextValue}>
      <div className="App">
          
          <header className="App__header">
              <h1>
                  <Link to="/">Noteful</Link>{' '}
              </h1>
          </header>
          <div className='App_Container'>
            <ErrorHandler>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
            </ErrorHandler>
            <ErrorHandler>
          <main className="App__main">{this.renderMainRoutes()}</main>
            </ErrorHandler>
          </div>
      </div>
      </StoreContext.Provider>
  );
}
}

export default App;

 