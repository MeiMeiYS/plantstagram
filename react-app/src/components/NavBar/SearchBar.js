import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './SearchBar.css'
import { searchUsers } from '../../store/users';
import { Avatar } from "@material-ui/core";

const SearchBar = () => {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false)
  const [result, setResult] = useState([]);
  console.log(result)

  useEffect(() => {
    if (searchTerm !== ''){
      setMenuOpen(true)
      // fetch data
      dispatch(searchUsers(searchTerm)).then(res => {
        setResult(Object.values(res))
      });
    } else setMenuOpen(false)
  }, [searchTerm]);



  return (
      <div className='search-bar-container'>
          <svg color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
          <input
            placeholder='Search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={e => {
              if (e.target.value) setMenuOpen(true);
            }}
            className={!menuOpen && 'grey-text'}
          ></input>
          { menuOpen &&
          <>
            <div className='background-overlay-transparent' onClick={e => setMenuOpen(false)}></div>
            <div id="search-result-arrow"></div>
            <div className='background-container'>
              <div className='search-result-container'>
                { result.length ?
                  result.map(user => {
                    return (
                      <NavLink key={`result-${user.username}`} className='search-result-user-container' to={`/${user.username}`} onClick={e => setMenuOpen(false)}>
                        <div className='avatar'>
                          <Avatar src={user.avatar_url} />
                        </div>
                        <div className='userinfo'>
                            <p>{user.username}</p>
                            <span>{user.name} | {user.email}</span>
                        </div>
                      </NavLink>
                    )
                  })
                  :
                  <div className='no-result-found'>
                    <p>No results found.</p>
                  </div>
                }
              </div>
            </div>
          </>}
      </div>
  );
}

export default SearchBar;
