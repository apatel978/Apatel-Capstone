import { csrfFetch } from "./csrf";

const GET_USER_WORKOUTS = 'workouts/GET_USER_WORKOUTS';
const GET_WORKOUT = 'workouts/GET_WORKOUT';
const DELETE_WORKOUT = 'workouts/DELETE_WORKOUT';
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT';

const getWorkouts = (workouts) => ({
    type: GET_USER_WORKOUTS,
    payload: workouts
})

const getOneWorkout = (workout) => ({
    type: GET_WORKOUT,
    payload: workout
})

const deleteWorkout = (id) => ({
    type: DELETE_WORKOUT,
    payload: id
})

const updateOneWorkout = (id, workout) => ({
    type: UPDATE_WORKOUT,
    payload: {id, workout}
})

export const getUserWorkouts = () => async (dispatch) => {
    const res =  await csrfFetch('/api/workouts/current');

    if (res.ok) {
        const data = await res.json();
        dispatch(getWorkouts(data))
        return data
    }
}

export const getOneWorkoutDetailbyId = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workouts/${id}`);

    if (res.ok) {
        const workout = await res.json();
        dispatch(getOneWorkout(workout));
        return workout;
    }
}

export const addWorkout = (workout) => async (dispatch) => {
    const res = await csrfFetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
    });

    if (res.ok) {
        const newWorkout = await res.json();
        console.log(newWorkout)
        dispatch(getOneWorkout(newWorkout));
        return newWorkout;
    }
}

export const updateWorkout = (workout, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
    });

    if (res.ok) {
        const updatedWorkout = await res.json();
        dispatch(updateOneWorkout(id, updatedWorkout));
        return updatedWorkout;
    }
}

export const deleteAWorkoutById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workouts/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteWorkout(id));
        return deleted;
    }
}

// Initial state
const initialState = {
    byId: {}
};

const workoutsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_WORKOUTS: {
            const newState = structuredClone(state);
            const workouts = action.payload.Workouts;
            workouts.forEach(workout => {
                newState.byId[workout.id] = workout
            })
            return newState;
        }
        case GET_WORKOUT: {
            const newState = structuredClone(state);
            const workout = action.payload;
            newState.byId[workout.id] = workout;
            // console.log('SPOT ', spot);
            return newState;
        }
        case UPDATE_WORKOUT: {
            const newState = structuredClone(state);
            const {id, workout} = action.payload;
            newState.byId[id] = workout;
            return newState
        }
        case DELETE_WORKOUT: {
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

export default workoutsReducer;
