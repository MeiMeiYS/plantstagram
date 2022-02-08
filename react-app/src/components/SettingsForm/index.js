import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './SettingsForm.css'
import EditProfile from './EditProfile';

const SettingsForm = () => {


    return (
        <div className='user-settings'>
            <div className='setting-sidebar'>
                <div>
                    <NavLink exact to='/accounts/edit' activeClassName='active-user-setting-navbar'>Edit Profile</NavLink>
                </div>
                <div>
                    <NavLink exact to='/accounts/password/change' activeClassName='active-user-setting-navbar'>Change Password</NavLink>
                </div>
            </div>
            <div className='setting-main-form'>
                <EditProfile />
            </div>
        </div>
    )
}

export default SettingsForm;
