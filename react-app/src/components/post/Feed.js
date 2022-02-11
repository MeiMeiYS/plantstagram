import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../store/posts";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Feed({ followedFeed }) {
  const posts = useSelector((state) => state.posts.posts);
  let toArray = [...Object.values(posts)].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
  const dispatch = useDispatch();
  const [items, updateItems] = useState([]);

  useEffect(() => {
    dispatch(loadFeed(followedFeed));
  }, [followedFeed]);

  useEffect(() => {
    console.log(posts);
    toArray = [...Object.values(posts)].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
    if (!items.length) updateItems(toArray.slice(0, 10));
    else updateItems(toArray.slice(0, items.length));
  }, [posts]);

  const fetchMoreData = () => {
    if (toArray.length > items.length)
      updateItems(toArray.slice(0, items.length + 10));
  };
  return (
    <InfiniteScroll
      className="feed-container"
      dataLength={items.length}
      next={fetchMoreData}
      style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
      // inverse={true}
      hasMore={toArray.length > items.length}
      loader={<h4>Loading...</h4>}
      endMessage={
        <div className="date-txt" style={{ textAlign: "center" }}>
          You've reached the end of this feed!
        </div>
      }
    >
      {items.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
}
