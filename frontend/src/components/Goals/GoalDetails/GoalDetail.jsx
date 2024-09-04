import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneGoalDetailbyId } from "../../../store/goal";
import './GoalDetail.css';

function GoalDetail({ goal }) {
    const dispatch = useDispatch();
    const goalId = goal.id;
    let classId;
    const goalbyId = useSelector(state => state.goals.byId[goalId])
    console.log(goalbyId);

    // const class;
    if (goalbyId.achieved) {
        classId = 'achievedStatus yes'
    } else {
        classId = 'achievedStatus no'
    }

    useEffect(() => {
        dispatch(getOneGoalDetailbyId(goalId))
    }, [dispatch, goalId])

    return (
        <div className="goal-detail-container">
            {/* <h1>Goal Detail from goal {goalId}</h1> */}
            <h3>{goalbyId.goal}</h3>
            <span className="workout-type">{goalbyId.details}</span>
            <div className="achievedDiv">
                <span>Achieved?</span>
                {goalbyId.achieved && <span className={classId}>Yes! Hooray!</span>}
                {!goalbyId.achieved && <span className={classId}>Not Yet</span>}
            </div>
            <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
        </div>
    )
}

export default GoalDetail;
