import { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import  { addUserObj } from '../../store/users';


const Profile = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const { userId } = useParams();
    console.log("from the begginng of the profile")
    const [profileUser, setProfileUser] = useState({})
    const settingBtn = useRef();
    
    useEffect(() => {
        const response = dispatch(addUserObj(userId))
        setProfileUser(response)
    }, [dispatch, userId])



    const name = profileUser.name;
    const username = profileUser.username;
    const bio = profileUser.bio;
    const followerCount = profileUser.followers_count;
    const followingCount = profileUser.following_count;
    const url = profileUser.avatar_url
    //to-do grab postCount info
    const postCount = 3

    
    return (
        <div className="profile_container"> 
            <div className="profile_img">
                <img src={url} alt="Profile Image"/>
            </div>
            <div className="profile_info">
                <div>
                    <h2>{username}</h2>
                    <NavLink exact to={`/accounts/edit`} ref={settingBtn}>
                        <svg aria-label="Settings" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        <span>Edit Profile</span>
                    </NavLink>
                    <button>Setting</button>
                </div>
                <div>
                    <span>{postCount} posts</span>
                    <span>{followerCount} followers</span>
                    <span>{followingCount} following</span>
                </div>
                <div>
                    <span>{name}</span>
                    <span>{bio}</span>
                </div>
            </div>
        </div>
    )
    //to do grab profile info
}

export default Profile;
