import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getOneGoalDetailbyId } from "../../../store/goal";
import { getOneWorkoutDetailbyId } from "../../../store/workout";
import './WorkoutDetail.css';

function WorkoutDetail({ workout }) {
    const dispatch = useDispatch();
    const workoutId = workout.id;
    const workoutbyId = useSelector(state => state.workouts.byId[workoutId])
    console.log(workoutbyId);
    console.log(workoutbyId.description);

    if (!workoutbyId.description) {
        workoutbyId.description = 'Need to alter or add notes to your workout? Take a minute to update it!'
    }

    useEffect(() => {
        dispatch(getOneWorkoutDetailbyId(workoutId))
    }, [dispatch, workoutId])

    return (
        <div className="goal-detail-container">
            {/* <h1>Goal Detail from goal {goalId}</h1> */}
            <h3>{workoutbyId.title}</h3>
            <span className="workout-type">{workoutbyId.type}</span>
            <div>
                <span className="actual-workout">{workoutbyId.workout}</span>
                <span className="workout-description">{workoutbyId.description}</span>
            </div>
            <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
        </div>
    )
}

export default WorkoutDetail;
