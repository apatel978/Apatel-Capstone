// import OpenModalButton from "../../OpenModalButton";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
// import GoalDetail from "../GoalDetails/GoalDetail";
import WorkoutDetail from "../WorkoutDetails/WorkoutDetail";
import { Link } from 'react-router-dom';
// import DeleteGoalModal from "../DeleteGoalModal/DeleteGoalModal";
import DeleteWorkoutModal from "../DeleteWorkoutModal/DeleteWorkoutModal";

function WorkoutTile({ workout }) {
    const title = workout.title;

    return (
        <div>
            {/* <h1>These are tiles!</h1> */}
            {/* {title} */}
            <OpenModalMenuItem
            itemText={title}
            modalComponent={<WorkoutDetail workout={workout}/>}

            />
            <div>
                <button><Link to={`/workouts/${workout.id}/edit`}>Update</Link></button>
                <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<DeleteWorkoutModal workout={workout}/>}
                />
            </div>
        </div>
    )
}

export default WorkoutTile;
