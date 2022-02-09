import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../store/posts";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Feed() {
  const posts = useSelector((state) => state.posts.posts);
  const toArray = [...Object.values(posts)].sort(
    (a, b) => a.updated_at - b.updated_at
  );
  const dispatch = useDispatch();
  const [items, updateItems] = useState([]);

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  useEffect(() => {
    if (!items.length) updateItems(toArray.slice(0, 10));
  }, [posts]);

  const fetchMoreData = () => {
    if (toArray.length > items.length)
      updateItems(toArray.slice(0, items.length + 10));
  };
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
      // inverse={true}
      hasMore={toArray.length > items.length}
      loader={<h4>Loading...</h4>}
      endMessage={<div>You've reached the end of this feed!</div>}
    >
      {items.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
}
