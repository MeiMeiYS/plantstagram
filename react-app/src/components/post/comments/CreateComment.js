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
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <input
          name="content"
          type="content"
          placeholder="Comment your thoughts..."
          value={content}
          onChange={updateContent}
        />
        <button type="submit">Send</button>
      </div>
    </form>
  );
}
