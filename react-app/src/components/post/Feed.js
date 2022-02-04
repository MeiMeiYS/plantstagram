import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../store/posts";
import Post from "./Post";

export default function Feed() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  return (
    <div className="feed-container">
      <h1>Feed!</h1>
      {posts ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <p>no posts have loaded</p>
      )}
    </div>
  );
}
