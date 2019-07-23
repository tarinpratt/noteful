import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './sideBar.css';
import StoreContext from '../storeContext';


class SideBar extends Component {
    static contextType = StoreContext;
    render(){
      
      const { folders = [] } = this.context
      
  return <ul className='folderList_List'>
      {folders.map((folder) => {
       return <li className='folderList' key ={folder.id}>
                <NavLink to={`/folder/${folder.id}`}>
                    {folder.name}
                </NavLink>
            </li>
            })}
            <Link to='/add-folder'>
         <button className='addFolder'>
          Add Folder
        </button>
        </Link>
      </ul>
      }
    }
export default SideBar;

SideBar.PropType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}