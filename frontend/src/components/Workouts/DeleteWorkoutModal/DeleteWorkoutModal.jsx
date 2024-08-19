import { useModal } from "../../../context/Modal";
// import { deleteAGoalById } from "../../../store/goal";
import { deleteAWorkoutById } from "../../../store/workout";
import { useDispatch } from "react-redux";

const DeleteWorkoutModal = ({ workout }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const workoutId = workout.id;

    const handleYes = async (e) => {
        e.preventDefault();
        console.log('You chose to delete');
        return dispatch(deleteAWorkoutById(workoutId))
        .then(closeModal)
    }

    const handleNo = async (e) => {
        e.preventDefault();
        console.log('You chose to keep');
        closeModal();
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this Workout?</h3>
            <div>
                <button onClick={handleYes}>Yes (Delete Workout)</button>
                <button onClick={handleNo}>No (Keep Workout)</button>
            </div>
        </div>
    )
}

export default DeleteWorkoutModal;
