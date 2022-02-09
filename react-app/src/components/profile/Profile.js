import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import  { addUserObj } from '../../store/users';

const Profile = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const { userId } = useParams();
    console.log("from the begginng of the profile")
    const [profileUser, setProfileUser] = useState({})
    
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
                    <button onClick={redirectToProfileSetting}>Edit Profile</button>
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
