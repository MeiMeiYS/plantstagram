import './FollowModal.css'
import { getFollowers } from '../../store/followers';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
const FollowersModal = ({userId, followers, showFollowers, setShowFollowers}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const list = [];
    useEffect(()=> {
        if (showFollowers) dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
    }, [showFollowers])

    useEffect(() => {
        if (allFollowers) {
            const values = Object.values(allFollowers);
            // values.forEach(follower => console.log(follower.username));
            values.forEach(follower => list.push(follower));

        }
    }, [allFollowers])

    return (
        // <div className="background-overlay">
        // </div>

            <div className="follow-modal">
                <div className="header">

                </div>
                <div className="main-content">
                    {list.map(userObj => (
                        <div className='follower-info-container'>
                            <div className='follower-pic'>{userObj.avatar_url}</div>
                            <div className='follower-username'>{userObj.username}</div>
                            <div className='follower-name'>{userObj.name}</div>
                            <button>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default FollowersModal;
