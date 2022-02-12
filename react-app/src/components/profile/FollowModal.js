import './FollowModal.css'
import { getFollowers } from '../../store/followers';
import { getFollowings } from '../../store/followers';

import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editFollower, isFollowing } from '../../store/followers';
import { Avatar } from "@material-ui/core";


const FollowersModal = ({userId, setShowFollowing, showFollowing, setShowFollowers, showFollowers, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const [allFollowings, setAllFollowings] = useState({});
    const [list, setList] = useState([])
    const [header, setHeader] = useState("")
    const [people, setPeople] = useState("")
    const [unfollow, setUnfollow] = useState(false);
    const [status, setStatus] = useState("");
    useEffect(()=> {
        if (showFollowers && overlay) {
            dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
        }
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
            setPeople("People")
        }

    }, [allFollowers])

    useEffect(() => {
        if (allFollowings) {
            const values = Object.values(allFollowings);
            const tempList1 = []
            values.forEach(following => tempList1.push(following));
            console.log(allFollowings)
            setList(tempList1)
            setPeople("People")
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
                    <div className='header'>{people}</div>
                    <div className="main-content">
                        <div className='follow-nonbutton'>
                            {list.length && list.map(userObj => (
                            <ul>
                                <li className='follower-list'>
                                        <div className='follow-info-container' key={userObj.username}>
                                            <div className='image-container'>
                                                <NavLink className='follow-photo-navlink' exact to={`/${userObj.username}`}>
                                                <Avatar
                                                    style={{ height: "50px", width: "50px", objectFit: "contain" }}
                                                     src={userObj.avatar_url}
                                                 />
                                                </NavLink>
                                            </div>
                                            {/* <div className='follow-pic'>{userObj.avatar_url}</div> */}
                                            <div className="username_name">
                                                <NavLink className='follow-name-navlink' exact to={`/${userObj.username}`}>
                                                    <div className='follow-username'>{userObj.username}</div>
                                                </NavLink>

                                                <div className='follow-name'>{userObj.name}</div>
                                            </div>
                                            <div className='follower-follow-button' key={userObj.username}>
                                                <button className='follow-button2'><span>{userObj.follow_status}</span></button>
                                            </div>
                                        </div>
                                </li>
                            </ul>
                            ))}
                        </div>
                        {/* <div className='rv_btn_container'>
                            {status.length && status.map(followStat => <button>{followStat}</button>)}
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default FollowersModal;
