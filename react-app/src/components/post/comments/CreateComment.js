import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../../store/posts";
export default function CreateComment({ postid }) {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createComment(postid, content));
    if (data) {
      setErrors(data);
    } else {
      setContent("");
    }
  };
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const updateContent = (e) => {
    setContent(e.target.value);
  };
  return (
    <form
      className="comment-box"
      onSubmit={!content.length ? undefined : onSubmit}
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
        className="bare-textarea"
        onFocus={handleKeyDown}
        onKeyDown={handleKeyDown}
        type="content"
        placeholder="Add a comment..."
        value={content}
        onChange={updateContent}
      />
      {!content.length ? (
        <div className={`btn-text bold disabled`} type="submit">
          Post
        </div>
      ) : (
        <button className={`btn-text bold pointer`} type="submit">
          Post
        </button>
      )}
    </form>
  );
}
