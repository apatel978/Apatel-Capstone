// import OpenModalButton from "../../OpenModalButton";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import GoalDetail from "../GoalDetails/GoalDetail";
import { Link } from 'react-router-dom';
import DeleteGoalModal from "../DeleteGoalModal/DeleteGoalModal";
import './GoalTile.css';

function GoalTile({ goal }) {
    const title = goal.goal;

    return (
        <div className="goal-tile">
            {/* <h1>These are tiles!</h1> */}
            {/* {title} */}
            <OpenModalMenuItem
            itemText={title}
            className="tile"
            modalComponent={<GoalDetail goal={goal}/>}
            />
            <div className="button-container">
                <div className="modButton">
                    <button><Link to={`/goals/${goal.id}/edit`}>Update</Link></button>
                </div>
                <div className="modButton">
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteGoalModal goal={goal}/>}
                    />
                </div>
            </div>
        </div>
    )
}

export default GoalTile;
