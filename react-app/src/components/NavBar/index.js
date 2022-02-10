import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import BtnGroup from './BtnGroup';
import './NavBar.css'
import logo6 from '../../images/logo6.png'

const NavBar = () => {
  return (
    <nav id='top-nav' className='nav-bar-strip' >
      <div className='nav-bar-container'>
        <div className='nav-bar-logo'>
          <NavLink className='logo-link' exact to={`/`}>
            <img src={logo6} alt='logo'></img>
          </NavLink>
        </div>
        <div className='nav-bar-search'>
          <SearchBar />
        </div>
        <div className='nav-bar-btns'>
         <BtnGroup />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
