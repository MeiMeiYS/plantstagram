import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../store/posts";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Feed() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const [postsDisplayed, updatePostsDisplayed] = useState(10);
  const [hasMore, updateHasMore] = useState(true);
  const [items, updateItems] = useState([]);
  useEffect(() => {
    // dispatch(loadFeed());
  }, []);
  useEffect(() => {
    // updateItems(posts.splice(0, 10));
  }, []);
  const fetchMoreData = () => {
    // if (posts.length > postsDisplayed)
    //   updatePostsDisplayed((prev) => prev + 10);
    // else updateHasMore(false);
  };
  return (
    <div
      id="scrollableDiv"
      style={{
        height: "auto",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={postsDisplayed}
        next={fetchMoreData}
        style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
        // inverse={true}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<div>You've reached the end of this feed!</div>}
        scrollableTarget="scrollableDiv"
      >
        {Object.keys(posts).map((key) => (
          <Post key={key} post={posts[key]} />
        ))}
      </InfiniteScroll>
    </div>
  );

  return (
    <div className="feed-container">
      <h1>Feed!</h1>
      {posts ? (
        Object.keys(posts).map((key) => <Post post={posts[key]} />)
      ) : (
        <p>no posts have loaded</p>
      )}
    </div>
  );
}
