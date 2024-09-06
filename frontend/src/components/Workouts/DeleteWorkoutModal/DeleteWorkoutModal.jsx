import { useModal } from "../../../context/Modal";
// import { deleteAGoalById } from "../../../store/goal";
import { deleteAWorkoutById } from "../../../store/workout";
import { useDispatch } from "react-redux";
import './DeleteWorkout.css';

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
        <div className="deleteWorkoutContainer">
            <h2 className="deleteTitle">Confirm Delete</h2>
            <h3 className="dq">Are you sure you want to remove this Workout?</h3>
            <div className="deleteButtonContainer">
                <button className=' deleteYes yes' onClick={handleYes}>Yes (Delete Workout)</button>
                <button className='deleteNo' onClick={handleNo}>No (Keep Workout)</button>
            </div>
        </div>
    )
}

export default DeleteWorkoutModal;
