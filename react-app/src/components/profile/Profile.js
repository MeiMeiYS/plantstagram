import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const Profile = (user) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const name = user.name;
    const username = user.username;
    const bio = user.bio;
    const followerCount = user.followers;
    const followingCount = user.following;
    //to-do grab postCount info
    const postCount = 3
    return (
        <div>
            <div>
                <span>{username}</span>
                <button>Edit Profile</button>
                <button>Setting</button>
            </div>
            <div>
                <span>{postCount}</span>
                <span>{followerCount}</span>
                <span>{followingCount}</span>
            </div>
            <div>
                <span>{name}</span>
                <span>{bio}</span>
            </div>
        </div>
    )
    //to do grab profile info
}

export default Profile;
