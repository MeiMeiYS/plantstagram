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
  commentSvg,
  emptyHeartSvg,
  getLikesString,
  getTimeString,
  redHeartSvg,
  threeDotSvg,
} from "../utils";
import OverlayPost from "./OverlayPost";

export default function Post({ post }) {
  const posts = useSelector((state) => state.posts.posts);
  const [anchorEl, setAnchorEl] = useState(false);
  const [displayedPost, updateDisplayedPost] = useState(post);
  const dispatch = useDispatch();

  const [overlayed, setOverlayed] = useState(false);

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
        {overlayed ? (
          <OverlayPost
            setOverlayed={setOverlayed}
            overlayed={overlayed}
            post={displayedPost}
          />
        ) : (
          <></>
        )}
        <div className="post-topbar">
          <div className="post-user">
            <Avatar src={displayedPost.user.avatar_url} />
            <span className="post-username">{displayedPost.user.username}</span>
          </div>
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
          <div className="padded">
            <span className="bold">{displayedPost.user.username} </span>
            {displayedPost.description}
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
        </div>
        <CreateComment postid={displayedPost.id} />
      </div>
    );
}
