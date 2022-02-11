import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/session";
import anonymous_user from '../../images/anonymous_user.jpeg';
import UploadProfileImg from './UploadProfileImg';


const EditProfile = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session?.user)

    const [ name, setName ] = useState(sessionUser.name);
    const [ username, setUserName ] = useState(sessionUser.username);
    const [ bio, setBio ] = useState(sessionUser.bio);
    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const [ errorMessages, setErrorMessages ] = useState([]);
    const [ showSuccess, setShowSuccess ] = useState('hidden');
    const [ disabled, setDisabled ] = useState(false);
    const [ overlayed, setOverlayed ] = useState(false);

    useEffect(() => {
        if (sessionUser.id == 1) {
            setDisabled(true);
        }
    }, [dispatch])


    useEffect(() => {
        setButtonDisabled(true)
        if (name !== sessionUser.name) {
            setButtonDisabled(false);
            setShowSuccess('hidden');
        };
        if (username !== sessionUser.username) {
            setButtonDisabled(false);
            setShowSuccess('hidden');
        };
        if (bio !== sessionUser.bio) {
            setButtonDisabled(false);
            setShowSuccess('hidden');
        };
    }, [name, username, bio])

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name,
            username,
            bio
        }
        //console.log() to do: update beow
        return dispatch(updateProfile(sessionUser.id, data)).then(res => {
            if (res.errors){
                setErrorMessages([...res.errors]);
            }
            else {
                setErrorMessages([]);
                setButtonDisabled(true);
                setShowSuccess('');
            }
        })
    }

    return (
        <>
            {overlayed && <UploadProfileImg overlayed={overlayed} setOverlayed={setOverlayed}/>}
            <form onSubmit={handleSubmit} className='edit-profile-form'>
                <div className='setting-user-row'>
                    <div className='setting-set-left'>
                        <div className='setting-profile-img-container'>
                            <img alt='anonymous user' src={anonymous_user}></img>
                        </div>
                    </div>
                    <div className='setting-set-right'>
                        <span className='setting-username-display'>{sessionUser.username}</span>
                        <button id='chnage-profile-picture' type='button' onClick={e => setOverlayed(true)}>Change Profile Photo</button>
                    </div>
                </div>
                <div >
                    <label className='setting-set-left'>Name</label>
                    <div className='setting-set-right'>
                        <input
                            disabled={disabled}
                            title={`${disabled && 'Demo user\'s name cannot be changed'}`}
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></input>
                        <p className='setting-input-guideline'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                    </div>
                </div>
                <div>
                    <label className='setting-set-left'>Username</label>
                    <div className='setting-set-right'>
                        <input
                            disabled={disabled}
                            title={`${disabled && 'Demo user\'s username cannot be changed'}`}
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        ></input>
                        <p className='setting-input-guideline'>You can change your username as long as the username is not picked up by another user.</p>
                    </div>
                </div>
                <div>
                    <label className='setting-set-left'>Bio</label>
                    <textarea
                        className='setting-set-right'
                        placeholder='Bio'
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    ></textarea>
                </div>
                <div className='setting-error-container'>
                    {errorMessages && errorMessages.map(error => (<p key={error} className="error">{error}</p>))}
                </div>
                <button className='setting-submit' type='submit' disabled={buttonDisabled}>Submit</button>
                <span className={`setting-success ${showSuccess}`}>✔ Success</span>
            </form>
        </>
    )
}

export default EditProfile;
