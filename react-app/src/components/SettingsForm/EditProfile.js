import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/users";

const EditProfile = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session?.user)


    const fullNamePlaceholder = 'user\'s Name';
    const usernamePlaceholder = 'username';
    const userBioPlaceholder = 'my bio~~'
    //remember to grab all these from redux store

    const [ name, setName ] = useState(fullNamePlaceholder);
    const [ username, setUserName ] = useState(usernamePlaceholder);
    const [ bio, setBio ] = useState(userBioPlaceholder);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name,
            username,
            bio
        }
        return dispatch(updateProfile(sessionUser.id, data))
    }

    return (
        <form onSubmit={handleSubmit} className='edit-profile-form'>
            <div>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <textarea
                    placeholder='Bio'
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                ></textarea>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default EditProfile;
