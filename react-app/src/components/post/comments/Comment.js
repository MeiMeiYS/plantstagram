import React from "react";
import "../post.css";
export default function Comment({ comment }) {
  return (
    <div>
      <span className="comment-name">{comment.user.username} </span>
      <span className="comment-content">{comment.content}</span>
    </div>
  );
}
