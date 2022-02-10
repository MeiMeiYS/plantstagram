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

export default function Post({ post }) {
  const posts = useSelector((state) => state.posts.posts);
  const [anchorEl, setAnchorEl] = useState(false);
  const [displayedPost, updateDisplayedPost] = useState(post);
  const dispatch = useDispatch();

  const today = new Date();
  const timestamp = new Date(displayedPost?.updated_at);
  const msInDay = 24 * 60 * 60 * 1000;

  let diff = (+today - +timestamp) / msInDay;
  let hoursAgo = 0;
  if (diff < 1) {
    hoursAgo = 24 * diff;
    if (hoursAgo > 1) hoursAgo = parseInt(hoursAgo);
  } else {
    today.setHours(0, 0, 0, 0);
    timestamp.setHours(0, 0, 0, 0);
    let diff = (+today - +timestamp) / msInDay;
  }
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
      <div className="post-container">
        <div className="post-topbar">
          <div className="post-user">
            <Avatar src={displayedPost.user.avatar_url} />
            <span className="post-username">{displayedPost.user.username}</span>
          </div>
          {/* <div>Post id: {displayedPost.id}</div> */}
          <span
            className="pointer center-text"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onMouseDown={handleClick}
          >
            <svg
              aria-label="More options"
              class="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </span>
          <Menu
            // keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <img className="post-img" src={displayedPost.image_url} />

        <div className="post-bottom">
          {displayedPost.user_liked ? (
            <button
              className="btn-text instagram-heart"
              onMouseDown={handleLike}
            >
              <svg
                aria-label="Unlike"
                class="_8-yf5 "
                color="#ed4956"
                fill="#ed4956"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </button>
          ) : (
            <button className="btn-text pointer" onMouseDown={handleLike}>
              <svg
                aria-label="Activity Feed"
                color="none"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
              </svg>
            </button>
          )}
          <div className="like-div">
            <span className="bold">
              {displayedPost.likes > 0 && displayedPost.likes}{" "}
              {displayedPost.likes == 0 ? (
                <span className="not-bold">
                  Be the first to{" "}
                  <span onClick={handleLike} className="bold pointer">
                    like this
                  </span>
                </span>
              ) : displayedPost.likes == 1 ? (
                "like"
              ) : (
                "likes"
              )}
            </span>
          </div>
          <div className="desc">
            <span className="bold">{displayedPost.user.username} </span>
            {displayedPost.description}
          </div>
          <div>
            <div className="post-comments">
              {displayedPost.comments.map((c) => {
                return <Comment key={c.id} comment={c} />;
              })}
            </div>
            <div className="date-txt">
              {hoursAgo >= 0 && hoursAgo < 1
                ? "less than an hour ago"
                : diff <= 1
                ? hoursAgo + " hours ago"
                : diff < 10
                ? diff + " days ago"
                : timestamp.toDateString()}
            </div>
          </div>
        </div>
        <CreateComment postid={displayedPost.id} />
      </div>
    );
}
