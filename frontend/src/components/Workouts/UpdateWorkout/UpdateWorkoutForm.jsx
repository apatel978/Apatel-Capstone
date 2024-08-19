import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getOneWorkoutDetailbyId, updateWorkout } from "../../../store/workout";

function UpdateWorkoutForm() {
    const { workoutId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const currWorkout = useSelector(state => state.workouts.byId[workoutId])
    const [ title, setTitle ] = useState(currWorkout?.title);
    const [ workout, setWorkout ] = useState(currWorkout?.workout);
    const [ type, setType] = useState(currWorkout?.type);
    const [ description, setDescription ] = useState(currWorkout?.description)
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

        const workoutPayload = {
            ownerId: id,
            title,
            workout,
            type,
            description
        }

        console.log(workoutPayload)

        dispatch(updateWorkout(workoutPayload, workoutId)).then(() => {
            navigate(`/current`)
        })

        setErrors({});
        setTitle('');
        setWorkout('');
        setType('')
        setDescription('');
        setHasSubmitted(false);
        setIsLoaded(false);

    }

    useEffect(() => {
        dispatch(getOneWorkoutDetailbyId(workoutId))
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, workoutId, isLoaded])

    useEffect(() => {
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!workout) errors.workout = "Workout is required";
        if (description?.length < 30) errors.description = "Description needs a minium of 30 characters";

        setErrors(errors);
    }, [title, workout, description])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Update Your Workout</span>
                </div>
                <div>
                    <label>
                        <span>Workout Title</span>
                        <span>Be sure to give your workout a clear and concise name!</span>
                        <input
                            type='text'
                            placeholder="Workout Title"
                            value={title}
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
                            onChange={e => setWorkout(e.target.value)}
                        />
                    </label>
                    {errors.details && hasSubmitted && <p className="errors">{errors.details}</p>}
                </div>
                <div>
                    <label>
                        <span>Workout Type</span>
                        <span>Give your workout a type to categorize it!</span>
                        <input
                            type='text'
                            placeholder="Workout Type"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                    </label>
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
                </div>
                <button type="submit">Update Workout</button>
            </form>
        </>
    )
}

export default UpdateWorkoutForm;
