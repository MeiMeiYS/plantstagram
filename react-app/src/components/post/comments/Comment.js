import React from "react";

export default function Comment({ comment }) {
  return (
    <div>
      "{comment.content}" by {comment.user.username}
    </div>
  );
}
