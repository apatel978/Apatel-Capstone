import { Link } from "react-router-dom";
import { getUserGoals } from "../../store/goal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GoalTile from "../Goals/GoalTiles/GoalTile";
// import OpenModalButton from "../OpenModalButton";

function Dashboard() {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false)
    const goals = useSelector(state => state.goals.byId);
    console.log(Object.values(goals));

    useEffect(() => {
        dispatch(getUserGoals()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch, isLoaded])

    return (
        <div>
            {/* <h1>Hello from your Dashboard!</h1> */}
            <div>
                <span>Your Goals</span>
                <button>
                    <Link to={`/goals/new`}>Create a New Goal!</Link>
                </button>
                {Object.values(goals).map((goal) => (
                    <GoalTile key={`${goal.id}`} goal={goal}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
