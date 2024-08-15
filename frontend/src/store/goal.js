import { csrfFetch } from "./csrf";

const GET_USER_GOALS = 'goal/GET_USER_GOALS';

const getGoals = (goals) => ({
    type: GET_USER_GOALS,
    payload: goals
})

export const getUserGoals = () => async (dispatch) => {
    const res = await csrfFetch('/api/goals/current');

    if (res.ok) {
        const data = await res.json();
        dispatch(getGoals(data))
        return data
    }
}

// Initial state
const initialState = {
    byId: {}
};

const goalsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_GOALS: {
            const newState = structuredClone(state);
            const goals = action.payload.Goals;
            goals.forEach(goal => {
                newState.byId[goal.id] = goal
            })
            return newState;
        }
        default:
            return state;
    }
}

export default goalsReducer;
