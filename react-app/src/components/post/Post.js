import React from "react";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { deletePostById } from "../../store/posts";
import CreateComment from "./comments/CreateComment";
import Comment from "./comments/Comment";

export default function Post({ post }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
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
  return (
    <div className="post-container">
      <div className="post-topbar">
        <div>User: {post.user.username}</div>
        <div>Post id: {post.id}</div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          ...
        </Button>
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
      <div className="post-img">{post.image_url}</div>

      <div>
        <div className="desc">{post.description}</div>
        <div>
          <div className="date-txt">
            {Date(post.updated_at).toLocaleString()}
          </div>
          <div>
            <div>Comments:</div>
            <div>
              {post.comments.map((c) => {
                return (
                  <div>
                    <Comment key={c} comment={c} />
                  </div>
                );
              })}
            </div>
          </div>
          <CreateComment postid={post.id} />
        </div>
      </div>
    </div>
  );
}
