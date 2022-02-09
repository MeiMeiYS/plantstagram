import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './SettingsForm.css'
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const SettingsForm = () => {

    const pathname = window.location.pathname
    const [ showEditProfile, setShowEditProfile ] = useState(false);
    const [ showChangePassword, setShowChangePassword ] = useState(false);

    useEffect(() => {
        if (pathname === '/accounts/edit') {
            setShowEditProfile(true)
            setShowChangePassword(false)
        }
        if (pathname === '/accounts/password/change') {
            setShowChangePassword(true)
            setShowEditProfile(false)
        }
    }, [pathname])

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
                {showEditProfile ? <EditProfile /> : null}
                {showChangePassword ? <ChangePassword /> : null}
            </div>
        </div>
    )
}

export default SettingsForm;
