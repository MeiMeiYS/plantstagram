import './FollowModal.css'
import { getFollowers, getFollowings } from '../../store/followers';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
const FollowersModal = ({userId, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const [allFollowings, setAllFollowings] = useState({});
    const [listFollowers, setListFollowers] = useState([])
    useEffect(()=> {
        if (overlay) dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
    }, [overlay])

    useEffect(() => {
        if (overlay) dispatch(getFollowinggits(userId)).then(res => setAllFollowers(res));
    }, [overlay])


    useEffect(() => {
        if (allFollowers) {
            const values = Object.values(allFollowers);
            const tempList = []
            values.forEach(follower => tempList.push(follower));
            setList(tempList)
        }
    }, [allFollowers])
     
    useEffect(() => {
        if (allFollowings) {
            const values = Object.values(allFollowings);
            const tempList = []
            values.forEach(follower => tempList.push(follower));
            setList(tempList)
        }
    }, [allFollowings])
    console.log(list,"Before the return ")
     
    return (
        <div className="background-overlay" onClick={e => setOverlay(false)}>
                <div className="follow-modal">
                    <div className="header"> FOLLOWERS
                    </div>
                    <div className="main-content">
                        {list.length && list.map(userObj => (
                            <div className='follow-info-container' key={userObj.username}>
                                <div className='follow-pic'>{userObj.avatar_url}</div>
                                <div className='follow-username'>{userObj.username}</div>
                                <div className='follow-name'>{userObj.name}</div>
                                <button>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default FollowersModal;
