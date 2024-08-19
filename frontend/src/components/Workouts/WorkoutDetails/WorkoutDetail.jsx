import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getOneGoalDetailbyId } from "../../../store/goal";
import { getOneWorkoutDetailbyId } from "../../../store/workout";

function WorkoutDetail({ workout }) {
    const dispatch = useDispatch();
    const workoutId = workout.id;
    const workoutbyId = useSelector(state => state.workouts.byId[workoutId])
    console.log(workoutbyId)

    useEffect(() => {
        dispatch(getOneWorkoutDetailbyId(workoutId))
    }, [dispatch, workoutId])

    return (
        <div>
            {/* <h1>Goal Detail from goal {goalId}</h1> */}
            <h3>{workoutbyId.title}</h3>
            <span>{workoutbyId.type}</span>
            <div>
                <span>{workoutbyId.workout}</span>
                <span>{workoutbyId.description}</span>
            </div>
        </div>
    )
}

export default WorkoutDetail;
