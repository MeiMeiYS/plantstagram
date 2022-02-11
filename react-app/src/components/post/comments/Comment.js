import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteCommentById, updateCommentById } from "../../../store/posts";
import { commentSvg, pencilSvg, trashSvg } from "../../utils";
import "../post.css";
export default function Comment({ comment }) {
  const user = useSelector((state) => state.session.user);
  const [showDelete, setShowDelete] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isEditting, setIsEditting] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");

  const dispatch = useDispatch();
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you'd like to delete your comment "${comment.content}"?`
      )
    ) {
      dispatch(deleteCommentById(comment.id));
    }
    setShowDelete(false);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateCommentById(comment.id, editCommentContent)
    );
    if (data) {
      setErrors(data);
    } else {
      setIsEditting(false);
    }
    setShowDelete(false);
  };
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
  };
  return (
    <div
      onMouseLeave={() => setShowDelete(false)}
      onMouseOver={() => setShowDelete(true)}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavLink
          to={comment.user.username}
          style={{
            textDecoration: "none",
            paddingRight: "4px",
            color: "black",
          }}
          className="bold"
        >
          {comment.user.username}
        </NavLink>
        {isEditting ? (
          <>
            <form
              onSubmit={!editCommentContent.length ? undefined : handleEdit}
            >
              {errors.length > 0 && (
                <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              )}
              <textarea
                required
                autoFocus
                className="edit-textarea"
                onFocus={handleKeyDown}
                onKeyDown={handleKeyDown}
                defaultValue={comment.content}
                style={{
                  fontSize: "12px",
                  width: "300px",
                  resize: "none",
                  borderRadius: "0",
                }}
                // onBlur={() => setIsEditting(false)}
                onBlur={(e) => {
                  setEditCommentContent(e.target.value);
                }}
              />
              <button
                onMouseDown={(e) => e.stopPropagation()}
                className="btn-text pointer"
                type="submit"
                style={{ paddingLeft: "4px", fontSize: "12px" }}
              >
                update
              </button>
              <button
                onMouseDown={(e) => {
                  setIsEditting(false);
                  setShowDelete(false);
                }}
                className="btn-text pointer"
                type="none"
                style={{ paddingLeft: "4px", fontSize: "12px" }}
              >
                cancel
              </button>
            </form>
          </>
        ) : (
          <>
            <span className="comment-content">{comment.content}</span>
            {comment.userid == user.id && showDelete ? (
              <>
                <span
                  style={{ display: "inline" }}
                  onMouseDown={handleDelete}
                  className="pointer"
                >
                  {trashSvg()}
                </span>
                <span
                  onMouseDown={() => setIsEditting(true)}
                  className="pointer"
                >
                  {pencilSvg()}
                </span>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
