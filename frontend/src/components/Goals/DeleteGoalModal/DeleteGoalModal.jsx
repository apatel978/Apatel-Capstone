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
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this Goal?</h3>
            <div>
                <button onClick={handleYes}>Yes (Delete Goal)</button>
                <button onClick={handleNo}>No (Keep Goal)</button>
            </div>
        </div>
    )
}

export default DeleteGoalModal
