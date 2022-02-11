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
import {
  emptyHeartSvg,
  getLikesString,
  getTimeString,
  redHeartSvg,
  threeDotSvg,
} from "../utils";
import { NavLink } from "react-router-dom";

export default function OverlayPost({ post, setOverlayed, overlayed }) {
  const posts = useSelector((state) => state.posts.posts);
  const [anchorEl, setAnchorEl] = useState(false);
  const [displayedPost, updateDisplayedPost] = useState(post);
  const dispatch = useDispatch();

  const timestamp = new Date(displayedPost?.updated_at);
  const timeString = getTimeString(timestamp);

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = (event) => {
    handleClose();
  };
  const handleDelete = (event) => {
    dispatch(deletePostById(post.id));
    handleClose();
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
      <div
        className="overlay-container"
        onClick={(e) => {
          setOverlayed(false);
        }}
      >
        <div
          // className="post-container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            // width: "70vw",
            maxHeight: "500px",
          }}
          onClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
          }}
        >
          <img className="post-img-overlay" src={displayedPost.image_url} />
          <div
            className="post-overlay-side"
            style={{ display: "flex", flexDirection: "column" }}
          >
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
              <span
                className="pointer center-text"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onMouseDown={handleClick}
              >
                {threeDotSvg()}
              </span>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
            <div className="post-bottom">
              <div>
                <div className="desc padded">
                  <span className="bold">{displayedPost.user.username} </span>
                  {displayedPost.description}
                </div>
                <div className="post-comments padded">
                  {displayedPost.comments.map((c) => {
                    return <Comment key={c.id} comment={c} />;
                  })}
                </div>
              </div>
              <div>
                {displayedPost.user_liked ? (
                  <button
                    className="btn-text instagram-heart padded"
                    onMouseDown={handleLike}
                  >
                    {redHeartSvg()}
                  </button>
                ) : (
                  <button
                    className="btn-text pointer padded"
                    onMouseDown={handleLike}
                  >
                    {emptyHeartSvg()}
                  </button>
                )}
                <div className="like-div padded">
                  {getLikesString(displayedPost, handleLike)}
                </div>
                <div className="date-txt padded">{timeString}</div>
              </div>
            </div>
            <CreateComment postid={displayedPost.id} />
          </div>
        </div>
      </div>
    );
}
