import './FollowModal.css'
import { getFollowers } from '../../store/followers';
import { getFollowings } from '../../store/followers';

import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isFollowing } from '../../store/followers';
import { Avatar } from "@material-ui/core";
import FollowBlock from './FollowBlock';
import { editFollowerModal } from '../../store/followers';

const FollowersModal = ({setProfileUser, profileUser, setFollowerCount, setFollowingCount, userId, setShowFollowing, showFollowing, setShowFollowers, showFollowers, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState({});
    const [allFollowings, setAllFollowings] = useState({});
    const [list, setList] = useState([])
    const [header, setHeader] = useState("")
    const [people, setPeople] = useState("")
    const [updateFollow, setUpdateFollow] = useState(false);
    const [follow, setFollow] = useState({});
    const [status, setStatus] = useState("");
    console.log(follow)
    useEffect(()=> {
        if (showFollowers && overlay) {
            dispatch(getFollowers(userId)).then(res => setAllFollowers(res));
        }
    }, [overlay])

    useEffect(() => {
        if (overlay && showFollowing) dispatch(getFollowings(userId)).then(res => setAllFollowings(res));
    }, [overlay])

    // useEffect(() => {
    //     if (follow) setUpdateFollow(true)
    // })

    // useEffect(() => {
    //     if (follow) {
    //         console.log(follow);
    //         dispatch(editFollowerModal(follow))
    //     }
    // }, [follow])

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
                <div className="follow-modal" onClick={e => e.stopPropagation()}>
                    <div className="header">{header}
                    </div>
                    <div className='header'>{people}</div>
                    <div className="main-content">
                        <div className='follow-nonbutton'>
                            {list.length !== 0 && list.map(userObj => (
                            <ul key={userObj.id}>
                                <FollowBlock setProfileUser={setProfileUser} profileUser={profileUser} setFollowerCount={setFollowerCount} setFollowingCount={setFollowingCount} userObj={userObj} setFollow={setFollow}/>
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
