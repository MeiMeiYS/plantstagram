export const getLikesString = (post, likeHandler) => (
  <span className="bold">
    {post.likes > 0 && post.likes}{" "}
    {post.likes == 0 ? (
      <span className="not-bold">
        Be the first to{" "}
        <span onClick={likeHandler} className="bold pointer">
          like this
        </span>
      </span>
    ) : post.likes == 1 ? (
      "like"
    ) : (
      "likes"
    )}
  </span>
);
export const getTimeString = (timestamp) => {
  const today = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  let diff = (+today - +timestamp) / msInDay;
  let hoursAgo = 0;

  if (diff < 1) {
    hoursAgo = 24 * diff;
    if (hoursAgo > 1) hoursAgo = parseInt(hoursAgo);
  } else {
    today.setHours(0, 0, 0, 0);
    timestamp.setHours(0, 0, 0, 0);
    diff = (+today - +timestamp) / msInDay;
  }
  return hoursAgo >= 0 && hoursAgo < 1 && diff < 1
    ? "less than an hour ago"
    : diff < 1
    ? hoursAgo == 1
      ? hoursAgo + " hour ago"
      : hoursAgo + " hours ago"
    : diff < 10
    ? diff == 1
      ? diff + " day ago"
      : diff + " days ago"
    : timestamp.toDateString();
};

export const threeDotSvg = () => (
  <svg
    aria-label="More options"
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
);

export const redHeartSvg = () => (
  <svg
    aria-label="Unlike"
    color="#ed4956"
    fill="#ed4956"
    height="24"
    role="img"
    viewBox="0 0 48 48"
    width="24"
  >
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

export const emptyHeartSvg = () => (
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
);

export const commentSvg = () => (
  <svg
    aria-label="Comment"
    color="#262626"
    fill="#262626"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

export const trashSvg = () => (
  <svg
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);
export const pencilSvg = () => (
  <svg
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
  >
    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
  </svg>
);
