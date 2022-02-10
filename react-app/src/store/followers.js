const GET_ALL_FOLLOWERS = "users/GET_ALL_FOLLOWERS";

const getFollowerList = (userId, followerList) => ({
    type: GET_ALL_FOLLOWERS,
    userId,
    payload: followerList
})

export const getFollowers = (userId) => async() => {
    const response = await fetch(`/api/users/${userId}/followers`);
    if (response.ok) {
        const followers = await response.json();
        return followers.user_follower_dict
    } else {
      return "ERROR"
    }
}


const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {

      case GET_ALL_FOLLOWERS:
        newState[action.username] = action.payload;
        return newState;
      default:
        return state;
    }
  }
