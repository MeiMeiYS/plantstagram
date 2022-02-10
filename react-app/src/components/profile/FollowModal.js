import './FollowModal.css'
import { getFollowers } from '../../store/followers';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
const FollowersModal = ({userId, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const [list, setList] = useState([])
    useEffect(()=> {
        if (overlay) dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
    }, [overlay])

    useEffect(() => {
        if (allFollowers) {
            const values = Object.values(allFollowers);
            // values.forEach(follower => console.log(follower.username));
            const tempList = []
            values.forEach(follower => tempList.push(follower));
            setList(tempList)
        }
    }, [allFollowers])

    return (
        <div className="background-overlay" onClick={e => setOverlay(false)}>
                <div className="follow-modal">
                    <div className="header">
                    </div>
                    <div className="main-content">
                        {list.length && list.map(userObj => (
                            <div className='follower-info-container'>
                                <div className='follower-pic'>{userObj.avatar_url}</div>
                                <div className='follower-username'>{userObj.username}</div>
                                <div className='follower-name'>{userObj.name}</div>
                                <button>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default FollowersModal;
