import { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { editFollower, isFollowing } from '../../store/followers';
import { addUserObj, getAllPosts } from '../../store/users';
import './Profile.css'
import FollowModal from './FollowModal';
import { Avatar } from '@material-ui/core';
import ProfilePost from './ProfilePost';
// import { getFollowers } from '../../store/followers';

const Profile = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const posts = useSelector(state => state.posts)
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState({})
    const settingBtn = useRef();
    const [overlay, setOverlay] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    // const [updateFollow, setUpdateFollow] = useState(false)
    const [isFollowed, setIsFollowed] = useState("")
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [postCount, setPostCount] = useState(0)
    const [allPosts, setAllPosts] = useState([]);

    const handleOpenFollow = (e) => {
        setShowFollowers(true)
        setOverlay(true)
    }

    const handleOpenFollowing = (e) => {
        setShowFollowing(true)
        setOverlay(true)
    }

    // useEffect(() => {
    //     if (updateFollow) {
    //         setUpdateFollow(false)
    //     }
    // }, [updateFollow, profileUser])



    useEffect(() => {
        (async () => {
          const userResponse = await fetch(`/api/users/${username}`);
          const user = await userResponse.json();
          dispatch(addUserObj(user.id))
          setProfileUser(user);

        //   setFollowerCount(profileUser.followers_count)
        //   setFollowingCount(profileUser.following_count)
        }
        )();

      }, [username]);



    useEffect(()=>{
        if (profileUser) {
            dispatch(isFollowing(profileUser.id)).then(res => {
                if (res) {
                    console.log(res, 'RESSSSSSSSSSSS')
                    setIsFollowed(res.status)
                }
              });
            dispatch(getAllPosts(profileUser.id)).then(res=>{
                if (res && res["0"]){
                    setAllPosts({})
                    setPostCount(0)
                    setFollowerCount(profileUser.followers_count)
                    setFollowingCount(profileUser.following_count)

                } else if (res){
                    setAllPosts(res)
                    setPostCount(Object.keys(res))
                    setFollowerCount(profileUser.followers_count)
                    setFollowingCount(profileUser.following_count)

                }
            })
        }
    },[profileUser, posts])
    // const profileUser1 = useSelector(state => state.users.userId)
    // const name = profileUser.name;
    // const username = profileUser.username;
    // const bio = profileUser.bio;
    // const followerCount = profileUser.followers_count;
    // const followingCount = profileUser.following_count;
    // const url = profileUser.avatar_url
    //to-do grab postCount info !!

    const handleFollow = (e) => {
        // setUpdateFollow(true)
        dispatch(editFollower(profileUser.id)).then(res => {
            if (res) {
                setProfileUser(res)
                dispatch(isFollowing(profileUser.id)).then(res => {
                    console.log("@@@@@@", res.status)
                    setIsFollowed(res.status)
                  });
            }
        })
    }

    return (
       <>
            <div className="pro_info">
                { profileUser && overlay &&
                        <FollowModal setFollowerCount={setFollowerCount} setFollowingCount={setFollowingCount} profileUser={profileUser} setProfileUser={setProfileUser} userId={profileUser.id} setShowFollowing={setShowFollowing} showFollowing={showFollowing} setShowFollowers={setShowFollowers} showFollowers={showFollowers} overlay={overlay} setOverlay={setOverlay}/>
                }
                {profileUser &&
                <div className="profile_container">
                    <div className="profile_img">
                        {/* <img className="profile_pic" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Question-mark-face.jpg" alt="Profile Image"/> */}
                        <Avatar
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={profileUser.avatar_url}/>
                    </div>
                    <div className="profile_info">
                        <div className='username_and_link'>
                            <h2 className="prof_username">{username}</h2>
                            <NavLink className="profile_edit_link" exact to={`/accounts/edit`} ref={settingBtn}>
                                <span className="prof-edit">Edit Profile</span>
                            </NavLink>
                            {/* <button className="prof_setting">
                                <svg aria-label="Settings" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </button> */}
                        </div>
                        <div className='count_info'>
                            <span className="post_count">{postCount} posts</span>
                            <button className="follower_count" onClick={handleOpenFollow}>{followerCount} followers</button>
                            <button className="following_count" onClick={handleOpenFollowing}>{followingCount} following</button>
                        </div>
                        <div className="prof_name">{profileUser.name}</div>
                        <div className='bio'>
                            <div>{profileUser.bio}</div>
                            {profileUser.id !== sessionUser.id ? <button className="follow-button" onClick={handleFollow}>{isFollowed}</button> : null}
                        </div>
                    </div>
                </div>}
            </div>
            <div className="prof-line"></div>
            <div className="prof-posts-img">
                <svg aria-label="" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                    <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                </svg>
                POSTS
            </div>
            <div className="prof-bot">
            {console.log(allPosts, "ALLLL POSTSSS")}
                {allPosts && Object.values(allPosts).map(posts => (
                    posts.map(post => (
                        <ProfilePost posts={posts} post={post}/>
                    ))
                ))}
            </div>
        </>
    )
    //to do grab profile info
}

export default Profile;
