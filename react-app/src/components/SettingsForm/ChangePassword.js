import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../store/session";
import { Avatar } from "@material-ui/core";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session?.user)

    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const [ errorMessages, setErrorMessages ] = useState([]);
    const [ showSuccess, setShowSuccess ] = useState('hidden');

    useEffect(() => {
        setButtonDisabled(true);
        if (oldPassword && newPassword && confirmPassword) {
            setButtonDisabled(false);
            setShowSuccess('hidden');
        };

    }, [oldPassword, newPassword, confirmPassword])

    const handleSubmit = e => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessages(['* Please make sure both passwords match.']);
            return
        }
        if (oldPassword === newPassword) {
            setErrorMessages(['* New password cannot be the same as old password.']);
            return
        }
        const data = {
            oldPassword,
            newPassword
        }

        return dispatch(updatePassword(sessionUser.id, data)).then(res => {
            if (res.errors){
                setErrorMessages([...res.errors]);
            }
            else {
                setErrorMessages([]);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowSuccess('');
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className='change-password-form'>
            <div className='setting-user-row'>
                <div className='setting-set-left'>
                    <div className='setting-profile-img-container'>
                        <Avatar
                            style={{ height: "100%", width: "auto", objectFit: "contain" }}
                            src={sessionUser.avatar_url}
                        />
                    </div>
                </div>
                <div className='setting-set-right'>
                    <span className='setting-username-display'>{sessionUser.username}</span>
                </div>
            </div>
            <div >
                <label className='setting-set-left' >Old Password</label>
                <div className='setting-set-right'>
                    <input
                        type='password'
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                    ></input>
                </div>
            </div>
            <div>
                <label className='setting-set-left'>New Password</label>
                <div className='setting-set-right'>
                    <input
                        type='password'
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    ></input>
                </div>
            </div>
            <div>
                <label className='setting-set-left'>Confirm New Password</label>
                <div className='setting-set-right'>
                    <input
                        type='password'
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className='setting-error-container'>
                {errorMessages && errorMessages.map(error => (<p key={error} className="error">{error}</p>))}
            </div>
            <button className='setting-submit' type='submit' disabled={buttonDisabled}>Submit</button>
            <span className={`setting-success ${showSuccess}`}>✔ Success</span>
        </form>
    )
}

export default ChangePassword;
