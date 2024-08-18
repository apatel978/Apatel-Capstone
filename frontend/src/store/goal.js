import { csrfFetch } from "./csrf";

const GET_USER_GOALS = 'goal/GET_USER_GOALS';
const GET_GOAL = 'goal/GET_GOAL';
const DELETE_GOAL = 'goal/DELETE_GOAL';
const UPDATE_GOAL = 'goal/UPDATE_GOAL';

const getGoals = (goals) => ({
    type: GET_USER_GOALS,
    payload: goals
})

const getOneGoal = (goal) => ({
    type: GET_GOAL,
    payload: goal
})

const deleteGoal = (id) => ({
    type: DELETE_GOAL,
    payload: id
})

const updateOneGoal = (id, goal) => ({
    type: UPDATE_GOAL,
    payload: {id, goal}
})

export const getUserGoals = () => async (dispatch) => {
    const res = await csrfFetch('/api/goals/current');

    if (res.ok) {
        const data = await res.json();
        dispatch(getGoals(data))
        return data
    }
}

export const getOneGoalDetailbyId = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/goals/${id}`);

    if (res.ok) {
        const goal = await res.json();
        dispatch(getOneGoal(goal));
        return goal;
    }
}

export const addGoal = (goal) => async (dispatch) => {
    const res = await csrfFetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
    });

    if (res.ok) {
        const newGoal = await res.json();
        console.log(newGoal)
        dispatch(getOneGoal(newGoal));
        return newGoal;
    }
}

export const updateGoal = (goal, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/goals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
    });

    if (res.ok) {
        const updatedGoal = await res.json();
        dispatch(updateOneGoal(id, updatedGoal));
        return updatedGoal;
    }
}

export const deleteAGoalById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/goals/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteGoal(id));
        return deleted;
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
        case GET_GOAL: {
            const newState = structuredClone(state);
            const goal = action.payload;
            newState.byId[goal.id] = goal;
            // console.log('SPOT ', spot);
            return newState;
        }
        case UPDATE_GOAL: {
            const newState = structuredClone(state);
            const {id, goal} = action.payload;
            newState.byId[id] = goal;
            return newState
        }
        case DELETE_GOAL: {
            const newState = structuredClone(state);
            // console.log('newState: ', state)
            const id = action.payload;
            delete newState.byId[id];
            return newState;
        }
        default:
            return state;
    }
}

export default goalsReducer;
