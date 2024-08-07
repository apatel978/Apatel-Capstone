import { csrfFetch } from './csrf'

// Action variables
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// Action Creators
const setUser = input => ({
    type: SET_USER,
    payload: input
})

const removeUser = () => ({
    type: REMOVE_USER,
})

// Thunks
export const setSessionUser = (user) => async (dispatch) => {
    const { credential, password } = user
    // console.log(credential)
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential,
            password
        })
    })

    const data = await res.json();
    dispatch(setUser(data.user));
    return res
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return res;
}

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

// Initial State
const initialState = {
    user: null
};

// Session Reducer function
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return { ...state, user: action.payload };
        }
        case REMOVE_USER: {
            const newState = structuredClone(state);
            newState.user = null
            return newState;
        }
        default:
            return state
    }
}

export default sessionReducer;
