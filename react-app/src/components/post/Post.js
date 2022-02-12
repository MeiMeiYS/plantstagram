import React from "react";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { deletePostById, likePostById } from "../../store/posts";
import CreateComment from "./comments/CreateComment";
import Comment from "./comments/Comment";
import { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { storage } from "../../firebase";
import { deleteObject } from "firebase/storage";
import {
  commentSvg,
  emptyHeartSvg,
  getLikesString,
  getTimeString,
  redHeartSvg,
  threeDotSvg,
} from "../utils";
import OverlayPost from "./OverlayPost";
import { NavLink } from "react-router-dom";
import EditPost from "./EditPost";

export default function Post({ post }) {
  const posts = useSelector((state) => state.posts.posts);
  const sessionUser = useSelector((state) => state.session?.user)
  const [anchorEl, setAnchorEl] = useState(false);
  const [displayedPost, updateDisplayedPost] = useState(post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [overlayed, setOverlayed] = useState(false);

  const [editOverlay, setEditOverlay] = useState(false);

  const timestamp = new Date(displayedPost?.updated_at);
  const timeString = getTimeString(timestamp);

  const handleClose = () => {
    setAnchorEl(false);
  };
  useEffect(() => {
    if (overlayed) {
      document.documentElement.style.overflow = "hidden";
      document.body.scroll = "no";
    } else {
      document.documentElement.style.overflow = "scroll";
      document.body.scroll = "yes";
    }
  }, [overlayed]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = (event) => {
    setEditOverlay(true);
    handleClose();
  };
  const handleDelete = (event) => {
    if (
      window.confirm(
        `Are you sure you'd like to delete your post "${post.description}"?`
      )
    ) {
      dispatch(deletePostById(post.id)).then(res => {
        if (!res) {
          // delete the old image from firebase
          // Create a reference to the file to delete
          const oldImg = storage._makeStorageReference(sessionUser.avatar_url);
          // Delete the file
          if (oldImg) {
              deleteObject(oldImg).then(() => {
                  // File deleted successfully
                  console.log('File deleted successfully')
              }).catch((error) => {
                  // Uh-oh, an error occurred!
                  console.log('Uh-oh, an error occurred!')
              });
              setOverlayed(false)
          }
        }
      });
      handleClose();
    }
  };
  const handleLike = (e) => {
    dispatch(likePostById(post.id));
  };
  useEffect(() => {
    const updatedPost = posts[post.id];
    if (updatedPost != post) {
      updateDisplayedPost(updatedPost);
    }
  }, [posts]);
  if (!displayedPost) return <></>;
  else
    return (
      <div className="post-container">
        {overlayed ? (
          <OverlayPost
            setOverlayed={setOverlayed}
            overlayed={overlayed}
            post={displayedPost}
          />
        ) : (
          <></>
        )}
        {editOverlay ? (
          <EditPost
            setOverlayed={setEditOverlay}
            overlayed={editOverlay}
            post={displayedPost}
          />
        ) : (
          <></>
        )}
        <div className="post-topbar">
          <NavLink
            to={`/${displayedPost.user.username}`}
            className="post-user"
            style={{ textDecoration: "none" }}
          >
            <Avatar src={displayedPost.user.avatar_url} />
            <span style={{ color: "black" }} className="post-username">
              {displayedPost.user.username}
            </span>
          </NavLink>
          {displayedPost.userid == user.id ? (
            <span
              className="pointer center-text"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onMouseDown={handleClick}
            >
              {threeDotSvg()}
            </span>
          ) : null}
          <Menu
            style={{ borderRadius: "0" }}
            keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <img
          onMouseDown={() => setOverlayed(true)}
          className="post-img"
          style={{ cursor: "pointer" }}
          src={displayedPost.image_url}
        />

        <div className="post-bottom">
          <div style={{ display: "flex" }} className="padded">
            {displayedPost.user_liked ? (
              <button
                className="btn-text instagram-heart"
                onMouseDown={handleLike}
              >
                {redHeartSvg()}
              </button>
            ) : (
              <button className="btn-text pointer" onMouseDown={handleLike}>
                {emptyHeartSvg()}
              </button>
            )}
            <span
              onMouseDown={() => setOverlayed(true)}
              className="pointer"
              style={{ paddingLeft: "8px" }}
            >
              {commentSvg()}
            </span>
          </div>
          <div className="like-div padded">
            {getLikesString(displayedPost, handleLike)}
          </div>
          <div
            style={{ width: "100%", wordBreak: "break-all" }}
            className="padded"
          >
            <span className="bold"> </span>
            <span style={{ paddingRight: "10px" }} className="desc">
              <span style={{ fontWeight: "bold", display: "inline" }}>
                {displayedPost.user.username}{" "}
              </span>
              {displayedPost.description}
            </span>
          </div>

          <div
            className="date-txt pointer"
            onMouseDown={() => setOverlayed(true)}
          >
            {displayedPost.comments.length > 0 ? (
              displayedPost.comments.length == 1 ? (
                <div className="padded">View 1 comment</div>
              ) : (
                <div className="padded">
                  View all {displayedPost.comments.length} comments
                </div>
              )
            ) : (
              <></>
            )}
          </div>

          <div>
            {/* <div className="post-comments">
              {displayedPost.comments.map((c) => {
                return <Comment key={c.id} comment={c} />;
              })}
            </div> */}
            <div className="date-txt padded">{timeString}</div>
          </div>

          <CreateComment postid={displayedPost.id} />
        </div>
      </div>
    );
}
