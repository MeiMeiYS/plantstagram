import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './profile/Profile';
import {useDispatch} from 'react-redux';
import addUserObj from '../store/users';


function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      // const response = await fetch(`/api/users/${userId}`);
      // const user = await response.json();
      dispatch(addUserObj(userId))
      // setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Profile user={user}/>
    </div>
  );
}
export default User;
