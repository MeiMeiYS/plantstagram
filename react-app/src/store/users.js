const ADD_USER = "users/ADD_USER";
const EDIT_CURRENT_USER = "users/EDIT_CURRENT_USER";

const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

const editCurrentUser = (user) => ({
    type: EDIT_CURRENT_USER,
    payload: user
})

export const updateProfile = (userId, data) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        console.log('yesssssss')
        const user = await response.json();
        console.log('~~~~~~~~~~~~~~~~~~')
        console.log(user)
        dispatch(editCurrentUser(user))
    }
    else {
        console.log('noooooooo')
    }
}


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_USER:
          //to do
        return { ...state, user: action.payload };
      case EDIT_CURRENT_USER:
        const newState = Object.assign({}, state);
        newState[action.payload.id] = action.payload
        return newState;
      default:
        return state;
    }
  }