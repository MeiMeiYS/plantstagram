const ADD_POST = "posts/ADD_POST";
const ADD_POSTS = "posts/ADD_POSTS";
const REMOVE_POST = "posts/REMOVE_POST";

// const ADD_COMMENT = "comments/ADD_COMMENT";
// const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

export const deleteCommentById = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // data is returned updated post
    const data = await response.json();
    dispatch(addPost(data));
    return null;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const createComment = (postid, content) => async (dispatch) => {
  const comment = { content: content };
  const response = await fetch(`/api/posts/${postid}/comments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    // data is returned updated post
    const data = await response.json();
    // I imagine addPost should overwrite the previous in the reducer
    dispatch(addPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateCommentById = (commentid, content) => async (dispatch) => {
  const comment = { content: content };
  const response = await fetch(`/api/comments/${commentid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    // data is returned updated post
    const data = await response.json();
    // I imagine addPost should overwrite the previous in the reducer
    dispatch(addPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const likePostById = (postid) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postid}/like`, {
    method: "POST",
  });

  if (response.ok) {
    // data is returned updated post
    const data = await response.json();
    dispatch(addPost(data));
    return null;
  } else {
    return ["An error occurred. Please try again."];
  }
};

const addPost = (post) => ({
  type: ADD_POST,
  post,
});
const addPosts = (posts) => ({
  type: ADD_POSTS,
  posts,
});
const removePostById = (id) => ({
  type: REMOVE_POST,
  id: id,
});

export const loadFeed = (followedFeed) => async (dispatch) => {
  const urlEnd = followedFeed ? "feed/followed" : "feed";
  const response = await fetch(`/api/posts/${urlEnd}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(addPosts(data.posts));
  }
};

export const deletePostById = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await dispatch(removePostById(id));
  }
};

export const createPost = (imgUrl, desc) => async (dispatch) => {
  const post = { image_url: imgUrl, description: desc };
  const response = await fetch("/api/posts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const data = await response.json();
    await dispatch(addPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = { posts: [] };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: { ...state.posts, [action.post.id]: action.post },
      };
    case ADD_POSTS:
      return {
        posts: { ...action.posts },
      };
    case REMOVE_POST:
      const newPosts = { ...state.posts };
      delete newPosts[action.id];
      return {
        ...state,
        posts: newPosts,
      };
    default:
      return state;
  }
}
