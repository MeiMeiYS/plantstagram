import { useState } from "react"
import OverlayPost from "../post/OverlayPost";

const ProfilePost = ({ post }) => {
    const [overlayed, setOverlayed] = useState(false);
    const handlePostOverlay = () => {
        setOverlayed(true)
    }

    return (
        <div className='postContainer'>
            {console.log(overlayed)}
            <img onClick={handlePostOverlay} className="prof_posts" src={post.image_url} alt="posts" key={post.id}/>
            {overlayed && <OverlayPost post={post} overlayed={overlayed} setOverlayed={setOverlayed}/>}
        </div>
    )
}
export default ProfilePost
