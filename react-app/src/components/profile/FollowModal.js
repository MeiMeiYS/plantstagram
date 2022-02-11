import './FollowModal.css'
import { getFollowers } from '../../store/followers';
import { getFollowings } from '../../store/followers';
import { NavLink } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
const FollowersModal = ({userId, setShowFollowing, showFollowing, setShowFollowers, showFollowers, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const [allFollowings, setAllFollowings] = useState({});
    const [list, setList] = useState([])
    const [header, setHeader] = useState("")
    useEffect(()=> {
        if (showFollowers && overlay) dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
    }, [overlay])

    useEffect(() => {
        if (overlay && showFollowing) dispatch(getFollowings(userId)).then(res => setAllFollowings(res));
    }, [overlay])

    useEffect(() => {
        if (allFollowers) {
            const values = Object.values(allFollowers);
            const tempList = []
            values.forEach(follower => tempList.push(follower));
            console.log(allFollowers)
            setList(tempList)
            setHeader("Follower")
        }

    }, [allFollowers])

    useEffect(() => {
        if (allFollowings) {
            const values = Object.values(allFollowings);
            const tempList1 = []
            values.forEach(following => tempList1.push(following));
            console.log(allFollowings)
            setList(tempList1)
            setHeader("Following")
        }
    }, [allFollowings])

    const handleOverlay = (e) => {
        setShowFollowers(false)
        setShowFollowing(false)
        setOverlay(false)

    }

    return (
        <div className="background-overlay" onClick={handleOverlay}>
                <div className="follow-modal">
                    <div className="header">{header}
                    </div>
                    <div className="main-content">
                        {list.length && list.map(userObj => (
                            <div className='follow-info-container' key={userObj.username}>
                                <img className="follower_profile_pic" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Question-mark-face.jpg" alt="Profile Image" />
                                {/* <div className='follow-pic'>{userObj.avatar_url}</div> */}
                                <div className="username_name">
                                    <NavLink className='follow-username' exact to={`/${userObj.username}`}>
                                        <div >{userObj.username}</div>
                                    </NavLink>
                                    <NavLink className='follow-name' exact to={`/${userObj.username}`}>
                                        <div >{userObj.name}</div>
                                    </NavLink>
                                </div>
                                <div className="rv_btn_container">
                                    <button className="remove_followers">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default FollowersModal;
