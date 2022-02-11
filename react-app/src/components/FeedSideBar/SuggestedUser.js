import { Avatar } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { editFollower } from "../../store/followers";
import "../post/post.css";
function SuggestedUser({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await fetch(`/api/users/${user.id}/follow_status`);
    if (response.ok) {
      const data = await response.json();
      setIsFollowing(data.status);
    }
  }, []);
  const handleFollow = async () => {
    await dispatch(editFollower(user.id));
    setIsFollowing((prev) => !prev);
  };
  return (
    <div
      style={{
        paddingTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`/${user.username}`}
        >
          <Avatar
            style={{ width: "32px", height: "32px" }}
            src={user.avatar_url}
          />
          <div className="bold" style={{ color: "black", paddingLeft: "8px" }}>
            {user.username}
          </div>
        </NavLink>
      </div>
      <div
        onMouseDown={handleFollow}
        style={{ cursor: "pointer", color: "var(--highligh-links)" }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </div>
    </div>
  );
}

export default SuggestedUser;
