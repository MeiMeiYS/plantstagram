// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_CURRENT_USER = "users/EDIT_CURRENT_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editCurrentUser = (user) => ({
  type: EDIT_CURRENT_USER,
  payload: user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, name, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      name,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const updateProfile = (userId, data) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/edit`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  })

  if (response.ok) {
      const user = await response.json();
      console.log(user)
      dispatch(editCurrentUser(user))
      return user
  } else {
    return response.json()
  }
}

export const updatePassword = (userId, data) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/changePassword`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  })

  return response.json()
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SET_USER:
      return { user: action.payload };

    case REMOVE_USER:
      return { user: null };

    case EDIT_CURRENT_USER:
      return { user: action.payload };

    default:
      return state;
  }
}
