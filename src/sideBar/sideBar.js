import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './sideBar.css';
import StoreContext from '../storeContext';


class SideBar extends Component {
    static contextType = StoreContext;
    render(){
      
      const { folders = [] } = this.context
      
  return <Fragment>
  <ul className='folderList_List'>
      {folders.map((folder) => {
       return <li className='folderList' key ={folder.id}>
                <NavLink to={`/folder/${folder.id}`}>
                    {folder.folder_name}
                </NavLink>
            </li>
            })}
            </ul>
            <Link to='/add-folder'>
         <button className='addFolder'>
          Add Folder
        </button>
        </Link>
      </Fragment>
      }
    }
export default SideBar;

