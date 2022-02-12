import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPost } from "../../store/posts";
import "./post.css";
const CreatePost = () => {
  const [errors, setErrors] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createPost(imgUrl, desc));
    if (data) {
      setErrors(data);
    }
  };

  const updateImgUrl = (e) => {
    setImgUrl(e.target.value);
  };

  const updateDesc = (e) => {
    setDesc(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="imgUrl">ImgUrl</label>
        <input
          name="imgUrl"
          type="text"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={updateImgUrl}
        />
      </div>
      <div>
        <label htmlFor="desc">Desc</label>
        <input
          name="desc"
          type="desc"
          placeholder="Desc"
          value={desc}
          onChange={updateDesc}
        />
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreatePost;
