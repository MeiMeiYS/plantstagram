import { useEffect, useState } from "react"
import OverlayPost from "../post/OverlayPost";
import { getUserPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const ProfilePost = ({post }) => {
    const [overlayed, setOverlayed] = useState(false);
    const dispatch = useDispatch();
    const postId = post.id;
    // const posts = useSelector(state => state.posts.posts)
    const [currentPost, setCurrentPost] = useState({});

    const handlePostOverlay = () => {
        setOverlayed(true)
        console.log(overlayed, "setoverlayed")
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
        <div className='post-container' id="profile-posts">
            <img onClick={handlePostOverlay} className="prof_posts" src={post.image_url} alt="posts" key={post.id}/>
            {overlayed && <OverlayPost post={currentPost} overlayed={overlayed} setOverlayed={setOverlayed}/>}
        </div>
    )
}
export default ProfilePost
