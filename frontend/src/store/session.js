import { csrfFetch } from "./csrf";

export const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const recieveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const removeCurrentUser = (userId) => ({
    type: REMOVE_CURRENT_USER,
    userId
});

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
    };
};

export const login = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(recieveCurrentUser(data.user));
    return res;
};

export const logout = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser(userId));
    return res;
};

export const signUp = (user) => async (dispatch) => {
    // const { email, firstName, lastName, birthday, gender } = user
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(recieveCurrentUser(data.user));
    return res;
};

const sessionReducer = (initialState = {}, action) => {
    Object.freeze(initialState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, { currentUser: action.user.id });
        case REMOVE_CURRENT_USER:
            return { currentUser: null }
        default:
            return initialState;
    };
};

export default sessionReducer;