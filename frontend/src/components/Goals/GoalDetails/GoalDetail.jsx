import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneGoalDetailbyId } from "../../../store/goal";

function GoalDetail({ goal }) {
    const dispatch = useDispatch();
    const goalId = goal.id;
    const goalbyId = useSelector(state => state.goals.byId[goalId])
    console.log(goalbyId)

    useEffect(() => {
        dispatch(getOneGoalDetailbyId(goalId))
    }, [dispatch, goalId])

    return (
        <div>
            {/* <h1>Goal Detail from goal {goalId}</h1> */}
            <h3>{goalbyId.goal}</h3>
            <span>{goalbyId.details}</span>
            <div>
                <span>Achieved?</span>
                {goalbyId.achieved && <span>Yes! Hooray!</span>}
                {!goalbyId.achieved && <span>Not Yet</span>}
            </div>
        </div>
    )
}

export default GoalDetail;
