import { Link } from "react-router-dom";
import { getUserGoals } from "../../store/goal";
import { getUserWorkouts } from "../../store/workout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GoalTile from "../Goals/GoalTiles/GoalTile";
import WorkoutTile from "../Workouts/WorkoutTiles/WorkoutTile";
// import OpenModalButton from "../OpenModalButton";
import './Dashboard.css'

function Dashboard() {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false)
    const goals = useSelector(state => state.goals.byId);
    const workouts = useSelector(state => state.workouts.byId);
    console.log(Object.values(workouts));

    useEffect(() => {
        dispatch(getUserGoals())
        .then(() => dispatch(getUserWorkouts()))
        .then(() => {
            setIsLoaded(true)
        });
    }, [dispatch, isLoaded])

    return (
        <div className="dashboard-container">
            <div>
                <div>
                    <div className="section-header">
                        <span>Your Goals</span>
                        <button>
                            <Link to={`/goals/new`}>Create a New Goal!</Link>
                        </button>
                    </div>
                    <div className="tiles-container">
                        {Object.values(goals).map((goal) => (
                            <GoalTile key={`${goal.id}`} goal={goal}/>
                        ))}
                    </div>
                </div>
                <div className="workout-section">
                    <div className="section-header">
                        <span>Your Workouts</span>
                        <button>
                            <Link to={`/workouts/new`}>Create a New Workout!</Link>
                        </button>
                    </div>
                    <div className="tiles-container">
                        {Object.values(workouts).map((workout) => (
                            <WorkoutTile key={`${workout.id}`} workout={workout}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
