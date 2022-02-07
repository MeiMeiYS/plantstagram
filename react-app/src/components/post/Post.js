import React from "react";

export default function Post({ post }) {
  return (
    <div className="post-container">
      <div className="post-topbar">
        <div>User id: {post.userid}</div>
        <div>Post id: {post.id}</div>
        <div className="post-btns">...</div>
      </div>
      <div className="post-img">{post.image_url}</div>

      <div>
        <div className="desc">{post.description}</div>
        <div>
          <div className="date-txt">
            {Date(post.updated_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
