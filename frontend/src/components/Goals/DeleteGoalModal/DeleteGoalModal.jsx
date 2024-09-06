import { useModal } from "../../../context/Modal";
import { deleteAGoalById } from "../../../store/goal";
import { useDispatch } from "react-redux";

const DeleteGoalModal = ({ goal }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const goalId = goal.id;

    const handleYes = async (e) => {
        e.preventDefault();
        console.log('You chose to delete');
        return dispatch(deleteAGoalById(goalId))
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
            <h3 className="dq">Are you sure you want to remove this Goal?</h3>
            <div className="deleteButtonContainer">
                <button className=' deleteYes yes' onClick={handleYes}>Yes (Delete Goal)</button>
                <button className='deleteNo' onClick={handleNo}>No (Keep Goal)</button>
            </div>
        </div>
    )
}

export default DeleteGoalModal;
