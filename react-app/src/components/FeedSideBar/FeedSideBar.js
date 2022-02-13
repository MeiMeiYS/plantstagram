import { Avatar } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import Footer from "../Footer";
import "../post/post.css";
import SuggestedUser from "./SuggestedUser";
function FeedSideBar() {
  const user = useSelector((state) => state.session.user);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  useEffect(async () => {
    const response = await fetch(`/api/users/suggestions`);
    if (response.ok) {
      const data = await response.json();
      setSuggestions(data.users);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px 16px",
        width: "293px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink style={{ textDecoration: "none" }} to={`/${user.username}`}>
            <div style={{ display: "flex" }}>
              <Avatar
                style={{ width: "64px", height: "64px" }}
                src={user.avatar_url}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "16px",
                }}
              >
                <span style={{ color: "black" }} className="bold">
                  {user.username}
                </span>
                <span className="date-txt">{user.name}</span>
              </div>
            </div>
          </NavLink>
          {/* <div
            onMouseDown={onLogout}
            className="center-text"
            style={{ cursor: "pointer", color: "var(--highligh-links)" }}
          >
            Switch
          </div> */}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="bold"
            style={{ filter: "contrast(25%)", paddingTop: "16px" }}
          >
            Suggestions For You
          </div>
          {/* <div>See All</div> */}
        </div>
        <div>
          {suggestions.map((user) => (
            <SuggestedUser key={user.id} user={user} />
          ))}
        </div>
        <p
          style={{
            color: "var(--border)",
            paddingTop: "32px",
            fontSize: "8px",
          }}
        >
          © 2022 | BUILT WITH REACT FLASK SQLALCHEMY
        </p>
      </div>
    </div>
  );
}

export default FeedSideBar;
