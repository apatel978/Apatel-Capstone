// import OpenModalButton from "../../OpenModalButton";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import GoalDetail from "../GoalDetails/GoalDetail";
import { Link } from 'react-router-dom';
import DeleteGoalModal from "../DeleteGoalModal/DeleteGoalModal";

function GoalTile({ goal }) {
    const title = goal.goal;

    return (
        <div>
            {/* <h1>These are tiles!</h1> */}
            {/* {title} */}
            <OpenModalMenuItem
            itemText={title}
            modalComponent={<GoalDetail goal={goal}/>}
            />
            <button><Link to={`/goals/${goal.id}/edit`}>Update</Link></button>
            <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteGoalModal goal={goal}/>}
            />
        </div>
    )
}

export default GoalTile;
