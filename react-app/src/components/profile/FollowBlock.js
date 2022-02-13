import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { editFollowerModal} from '../../store/followers';
import { useDispatch } from "react-redux";
import { addUserObj } from "../../store/users";

const FollowBlock = ({profileUser, setProfileUser, setFollowerCount, setFollowingCount, userObj}) => {
    const [following, setFollowing] = useState(userObj?.follow_status);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(editFollowerModal(userObj.id)).then(res => {
            if (res) {
                if (following === "Following") {
                    setFollowing("Follow")

                }
                else {
                    setFollowing("Following")
                }
                dispatch(addUserObj(profileUser.id)).then(res => {
                    if (res) {
                        setProfileUser(res)
                        setFollowerCount(res.followers_count)
                        console.log("CCCCCCCCCCC", res.followers_count)
                        console.log("CCCCCCCCC", res.following_count)
                        setFollowingCount(res.following_count)
                    }
                })
            }
        })

    }

    return (
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
        {/* <div className='follower-follow-button' key={userObj.username}>
            <button onClick={handleFollow} className='follow-button2'><span>{following}</span></button>
        </div> */}
    </div>
    </li>
    )
}

export default FollowBlock
