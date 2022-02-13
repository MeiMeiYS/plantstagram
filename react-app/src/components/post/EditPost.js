import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, editPost } from "../../store/posts";
import { Avatar } from "@material-ui/core";
import "../NavBar/UploadImg.css";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditPost = ({ post, overlayed, setOverlayed }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [desc, setDesc] = useState("");
  console.log(errors);
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editPost(post.id, desc)).then((res) => {
      if (res) {
        setErrors(res);
      } else {
        setOverlayed(false);
      }
    });
  };

  const updateDesc = (e) => {
    setDesc(e.target.value);
  };

  const closeOverlay = (e) => {
    document.body.classList.remove("modal-open");
    setOverlayed(false);
  };
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
  };
  return (
    <div className="background-overlay" onClick={closeOverlay}>
      <div
        className="upload-img-UI-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">
          <h2>Edit your caption</h2>
        </div>
        <div className="main-content">
          <div className="write-post-caption">
            <div className="upload-img-user-row">
              <div className="upload-img-profile-img-container">
                <Avatar
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                  src={sessionUser.avatar_url}
                />
              </div>
              <span className="upload-img-username-display">
                {sessionUser.username}
              </span>
            </div>
            <form onSubmit={onSubmit}>
              <textarea
                maxLength={2200}
                onFocus={handleKeyDown}
                onKeyDown={handleKeyDown}
                style={{ resize: "none" }}
                name="desc"
                type="desc"
                placeholder="Write a caption..."
                value={desc}
                onChange={updateDesc}
              />
              <div className="errors">
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
              <div className="submit-new-post">
                <button
                  className="btn-text pointer"
                  type="submit"
                  // disabled={errors.length == 0}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
