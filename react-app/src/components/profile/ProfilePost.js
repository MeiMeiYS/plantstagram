import { useEffect, useState } from "react"
import OverlayPost from "../post/OverlayPost";
import { getUserPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const ProfilePost = ({post }) => {
    const [overlayed, setOverlayed] = useState(false);
    const dispatch = useDispatch();
    const postId = post.id;
    // const currentPost = useSelector(state => state.posts[postId])
    const [currentPost, setCurrentPost] = useState({});
    // const testObj = {
    //     "comments": [
    //         {
    //             "content": "Cactus are overrated.",
    //             "id": 3,
    //             "user": {
    //                 "avatar_url": null,
    //                 "bio": null,
    //                 "email": "bobbie@aa.io",
    //                 "followers_count": 1,
    //                 "following_count": 0,
    //                 "id": 3,
    //                 "name": "Bobby Demo",
    //                 "username": "bobbie"
    //             },
    //             "userid": 3
    //         },
    //         {
    //             "content": "asdasd",
    //             "id": 4,
    //             "user": {
    //                 "avatar_url": "https://firebasestorage.googleapis.com/v0/b/plantstagram-55963.appspot.com/o/images%2F1-Demo-1644719842695?alt=media&token=d84b13f3-3556-4116-ae24-bef5949d105c",
    //                 "bio": "update bio",
    //                 "email": "demo@aa.io",
    //                 "followers_count": 2,
    //                 "following_count": 2,
    //                 "id": 1,
    //                 "name": "Demo User",
    //                 "username": "Demo"
    //             },
    //             "userid": 1
    //         }
    //     ],
    //     "description": "Cactus are the best.",
    //     "id": 2,
    //     "image_url": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    //     "likes": 1,
    //     "updated_at": "Tue, 08 Feb 2022 22:52:47 GMT",
    //     "user": {
    //         "avatar_url": null,
    //         "bio": null,
    //         "email": "marnie@aa.io",
    //         "followers_count": 1,
    //         "following_count": 2,
    //         "id": 2,
    //         "name": "Marnie Demo",
    //         "username": "marnie"
    //     },
    //     "user_liked": true,
    //     "userid": 2
    // }

    const handlePostOverlay = () => {
        setOverlayed(true)
        console.log("setoverlayed")
    }

    useEffect(()=> {
        dispatch(getUserPosts(post.id)).then(res => {
            if (res) {
                console.log(res, "SET CURRENT POST")
                setCurrentPost(res)
                console.log(currentPost, "@@@@@@@@@@@@@@@")
            }
        })

    }, [dispatch, post.id])

    return (
        <div className='postContainer'>
            <img onClick={handlePostOverlay} className="prof_posts" src={post.image_url} alt="posts" key={post.id}/>
            {console.log(currentPost, "3333333333")}
            {overlayed && <OverlayPost post={currentPost} overlayed={overlayed} setOverlayed={setOverlayed}/>}
        </div>
    )
}
export default ProfilePost
