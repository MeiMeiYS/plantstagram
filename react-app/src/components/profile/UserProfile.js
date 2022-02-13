import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { addUserObj, getAllPosts } from "../../store/users";
import { Avatar } from "@material-ui/core";
import { isFollowing, editFollower } from "../../store/followers";

const UserProfile = () => {
    const {username} = useParams();
    const dispatch = useDispatch();
    // const [profileUser, setProfileUser] = useState({});
    // const profileUserId = profileUser?.id;
    const [allPosts, setAllPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const currentProfileUser = useSelector(state => state.users[username]);
    const sessionUser = useSelector(state => state.session.user)
    const [updateFollow, setUpdateFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState("")

    // console.log(profileUserId);
    // const currentProfileUser = useSelector(state => state.users?.profileUserId);
    // console.log(currentProfileUser)
    useEffect(() => {
        (async () => {
          const userResponse = await fetch(`/api/users/${username}`);
          const user = await userResponse.json();
          dispatch(addUserObj(user.id))
          dispatch(isFollowing(user.id)).then(res => setIsFollowed(res.status));

        //   dispatch(isFollowing(user.id)).then(res => setIsFollowed(res.status));
        //   setFollowerCount(profileUser.followers_count)
        //   setFollowingCount(profileUser.following_count)
        }
        )();

      }, [username]);

      useEffect(() => {
        if (updateFollow) {
            dispatch(editFollower(currentProfileUser.id)).then(res => {
                if (res) {
                    console.log(res, "RESSSSS")
                    setUpdateFollow(false)
                }
            })
        }
    }, [updateFollow, currentProfileUser])

      useEffect(()=>{
        if (currentProfileUser) {
            setFollowerCount(currentProfileUser.followers_count)
            setFollowingCount(currentProfileUser.following_count)

            dispatch(getAllPosts(currentProfileUser.id)).then(res=>{
                if (res && res["0"]){
                    setAllPosts({})
                    setPostCount(0)


                } else if (res){
                    setAllPosts(res)
                    setPostCount(Object.keys(res))
                    setFollowerCount(currentProfileUser.followers_count)
                    setFollowingCount(currentProfileUser.following_count)

                }
            })
        }
    },[currentProfileUser]);

    const handleFollow = (e) => {
        setUpdateFollow(true)
    }

    return (
        <div className="pro_info">
            {currentProfileUser &&
                <div className="profile_container">
                    <div className="profile_img">
                        {/* <img className="profile_pic" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Question-mark-face.jpg" alt="Profile Image"/> */}
                        <Avatar
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={currentProfileUser.avatar_url}/>
                    </div>
                    <div className="profile_info">
                        <div className='username_and_link'>
                            <h2 className="prof_username">{username}</h2>
                            <NavLink className="profile_edit_link" exact to={`/accounts/edit`}>
                                <span className="prof-edit">Edit Profile</span>
                            </NavLink>
                            {/* <button className="prof_setting">
                                <svg aria-label="Settings" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </button> */}
                        </div>
                        <div className='count_info'>
                            <span className="post_count">{postCount} posts</span>
                            <button className="follower_count">{followerCount} followers</button>
                            <button className="following_count">{followingCount} following</button>
                        </div>
                        <div className="prof_name">{currentProfileUser.name}</div>
                        <div className='bio'>
                            <div>{currentProfileUser.bio}</div>
                            {currentProfileUser.id !== sessionUser.id ? <button className="follow-button" onClick={handleFollow}>{isFollowed}</button> : null}
                        </div>
                    </div>
                </div>}
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
                        {allPosts && Object.values(allPosts).map(url => (
                            <img className="prof_posts" src={url} alt="posts" key={url}/>
                        ))}
                    </div>
        </div>
    )
}

export default UserProfile
