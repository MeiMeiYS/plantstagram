import { Avatar } from "@material-ui/core";
import React from "react";
import "../post/post.css";
function SuggestedUser({ user }) {
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
        <Avatar
          style={{ width: "32px", height: "32px" }}
          src={user.avatar_url}
        />
        <div className="bold" style={{ paddingLeft: "8px" }}>
          {user.username}
        </div>
      </div>
      <div style={{ cursor: "pointer", color: "var(--highligh-links)" }}>
        Follow
      </div>
    </div>
  );
}

export default SuggestedUser;
