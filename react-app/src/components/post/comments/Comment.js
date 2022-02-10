import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentById } from "../../../store/posts";
import "../post.css";
export default function Comment({ comment }) {
  const user = useSelector((state) => state.session.user);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteCommentById(comment.id));
  };
  return (
    <div
      onMouseLeave={() => setShowDelete(false)}
      onMouseOver={() => setShowDelete(true)}
    >
      <span className="bold">{comment.user.username} </span>
      <span className="comment-content">{comment.content}</span>
      {comment.userid == user.id && showDelete ? (
        <span onMouseDown={handleDelete} className="pointer">
          {" "}
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
