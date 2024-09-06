import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGoal } from "../../../store/goal";

function CreateNewGoal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const [ goal, setGoal ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ achieved, setAchieved] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

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

        dispatch(addGoal(goalPayload)).then(() => {
            navigate(`/current`)
        })

        setErrors({});
        setGoal('');
        setDetails('');
        setAchieved(false);
        setHasSubmitted(false);

    }

    useEffect(() => {
        const errors = {};
        if (!goal) errors.goal = "Goal is required";
        if (details.length < 30) errors.details = "Details needs a minium of 30 characters";

        setErrors(errors);
    }, [goal, details])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <span className='formHeader'>Create a New Goal</span>
                    <span className='inspirationalBlurb'>Start creating your steps to achieve your dreams!</span>
                </div>
                <div>
                    <label>
                        <span className="workoutTitle">Goal Name</span>
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
                        <span className="workoutTitle">Give some details about your goal</span>
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
                <div className="button-container">
                    <button type="submit">Create Goal</button>
                </div>
            </form>
        </>
    )
}

export default CreateNewGoal;
