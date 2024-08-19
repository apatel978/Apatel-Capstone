import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addGoal } from "../../../store/goal";
import { addWorkout } from "../../../store/workout";

function CreateNewWorkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const [ title, setTitle ] = useState('');
    const [ workout, setWorkout ] = useState('');
    const [ type, setType] = useState('');
    const [ description, setDescription ] = useState('')
    const [ errors, setErrors ] = useState({});
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {id} = sessionUser;
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return;
        }

        const workoutPayload = {
            ownerId: id,
            title,
            workout,
            type,
            description
        }

        console.log(workoutPayload)

        dispatch(addWorkout(workoutPayload)).then(() => {
            navigate(`/current`)
        })

        setErrors({});
        setTitle('');
        setWorkout('');
        setType('')
        setDescription('');
        setHasSubmitted(false);

    }

    useEffect(() => {
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!workout) errors.workout = "Workout is required";
        if (!type) errors.type = "Type is required";
        if (description.length < 30) errors.description = "Description needs a minium of 30 characters";

        setErrors(errors);
    }, [title, workout, type, description])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Create a New Workout</span>
                </div>
                <div>
                    <label>
                        <span>Workout Title</span>
                        <span>Be sure to give your workout a clear and concise name!</span>
                        <input
                            type='text'
                            placeholder="Workout Title"
                            value={title}
                            required
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    {errors.title && hasSubmitted && <p className="errors">{errors.title}</p>}
                </div>
                <div>
                    <label>
                        <span>What&apos;s your workout going to be?</span>
                        <span>Include as many or as little exercises you like!</span>
                        <textarea
                            type='text'
                            // className="DescriptionTextArea"
                            placeholder="Workout"
                            value={workout}
                            required
                            onChange={e => setWorkout(e.target.value)}
                        />
                    </label>
                    {errors.workout && hasSubmitted && <p className="errors">{errors.workout}</p>}
                </div>
                <div>
                    <label>
                        <span>Workout Type</span>
                        <span>Give your workout a type to categorize it!</span>
                        <input
                            type='text'
                            placeholder="Workout Type"
                            value={type}
                            required
                            onChange={e => setType(e.target.value)}
                        />
                    </label>
                    {errors.type && hasSubmitted && <p className="errors">{errors.type}</p>}
                </div>
                <div>
                    <label>
                        <span>Write some notes and give your workout a description!</span>
                        <span>Rest times between exercises? The amount of weight? Give plenty of details for the best workout!</span>
                        <textarea
                            type='text'
                            // className="DescriptionTextArea"
                            placeholder="Workout"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    {errors.description && hasSubmitted && <p className="errors">{errors.description}</p>}
                </div>
                <button type="submit">Create Workout</button>
            </form>
        </>
    )
}

export default CreateNewWorkout;
