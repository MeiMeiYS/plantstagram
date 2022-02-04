// constants
const ADD_POST = "posts/ADD_POST";
const REMOVE_POST = "posts/REMOVE_POST";

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

const removePostById = (id) => ({
  type: REMOVE_POST,
  id: id,
});

export const loadFeed = () => async (dispatch) => {
  const response = await fetch("/api/posts/feed");
  if (response.ok) {
    const data = await response.json();
    for (const p of data.posts) {
      dispatch(addPost(p));
    }
  }
};
export const deletePostById = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removePostById(data.id));
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
const initialState = { posts: [] };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [action.post, ...state.posts],
      };
    case REMOVE_POST:
      const newState = state;
      delete newState.posts[action.id];
      return newState;
    default:
      return state;
  }
}
