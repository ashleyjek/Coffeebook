import { csrfFetch } from "./csrf";
import { RECEIVE_CURRENT_USER } from "./session";
import { receiveErrors } from "./errors";

export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const RECEIVE_PROFILE_USER = 'users/RECEIVE_PROFILE_USER'

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const receiveProfileUser = (users, friendships, posts, comments, likes) => ({
    type: RECEIVE_PROFILE_USER,
    users,
    friendships,
    posts,
    comments,
    likes
})

export const getUsers = (state) => {
    if (state.entities.users) {
        return Object.values(state.entities);
    } else {
        return [];
    }
}

export const updateUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: user
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveProfileUser(
            data.users, 
            data.friendships, 
            data.posts, 
            data.comments,
            data.likes));
        return res;
    } else {
        dispatch(receiveErrors(data.users));
        return res;
    }
}

export const updateUserBio = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveProfileUser(
            data.users, 
            data.friendships, 
            data.posts, 
            data.comments,
            data.likes));
        return res;
    } else {
        dispatch(receiveErrors(data.users));
        return res;
    }
}

export const fetchUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveUser(data.user));
        return res;
    }
}

export const fetchProfileUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveProfileUser(
                data.users, 
                data.friendships, 
                data.posts, 
                data.comments,
                data.likes));
        dispatch(receiveUsers(data.users))
        return res;
    };
};

export const fetchUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveUsers(data.users, data.friendships));
        return res;
    }
}

const usersReducer = ( state = {}, action ) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...nextState,
                [action.user.id]: action.user
            }
        case RECEIVE_PROFILE_USER:
            return {
                ...nextState,
                ...action.users
            }
        case RECEIVE_USERS:
            return {
                ...nextState,
                ...action.users
            }
        default:
            return nextState;
    }
}
export default usersReducer;
