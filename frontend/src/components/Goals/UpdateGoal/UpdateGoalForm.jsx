import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneGoalDetailbyId, updateGoal } from "../../../store/goal";

function UpdateGoalForm() {
    const { goalId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const currGoal = useSelector(state => state.goals.byId[goalId]);
    const [ goal, setGoal ] = useState(currGoal?.goal);
    const [ details, setDetails ] = useState(currGoal?.details);
    const [ achieved, setAchieved] = useState(currGoal?.achieved);
    const [ errors, setErrors ] = useState({});
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {id} = sessionUser;
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return;
        }

        const goalPayload = {
            ownerId: id,
            goal,
            details,
            achieved,
        }

        console.log(goalPayload)

        dispatch(updateGoal(goalPayload, goalId)).then(() => {
            navigate(`/current`)
        })

        setErrors({});
        setGoal('');
        setDetails('');
        setAchieved(false);
        setHasSubmitted(false);
        setIsLoaded(false);

    }

    useEffect(() => {
        dispatch(getOneGoalDetailbyId(goalId))
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, goalId, isLoaded])

    useEffect(() => {
        const errors = {};
        if (!goal) errors.goal = "Goal is required";
        if (details?.length < 30) errors.details = "Details needs a minium of 30 characters";

        setErrors(errors);
    }, [goal, details])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Update Your Goal</span>
                    {/* <span>Start creating your steps to achieve your dreams!</span> */}
                </div>
                <div>
                    <label>
                        <span>Goal Name</span>
                        <span>Be sure to give your goal a clear and concise name!</span>
                        <input
                            type='text'
                            placeholder="Goal Title"
                            value={goal}
                            required
                            onChange={e => setGoal(e.target.value)}
                        />
                    </label>
                    {errors.goal && hasSubmitted && <p className="errors">{errors.goal}</p>}
                </div>
                <div>
                    <label>
                        <span>Give some details about your goal</span>
                        <span>Mention specifics! What do you plan to do to improve? How often? Give plenty of details for yourself to follow!</span>
                        <textarea
                            type='text'
                            // className="DescriptionTextArea"
                            placeholder="Please write at least 30 characters"
                            value={details}
                            required
                            onChange={e => setDetails(e.target.value)}
                        />
                    </label>
                    {errors.details && hasSubmitted && <p className="errors">{errors.details}</p>}
                </div>
                <div>
                    <span>Have you achieved your goal?</span>
                    <button onClick={() => setAchieved(true)}>Yes</button>
                    <button onClick={() => setAchieved(false)}>No</button>
                </div>
                <button type="submit">Update Goal</button>
            </form>
        </>
    )
}

export default UpdateGoalForm;
