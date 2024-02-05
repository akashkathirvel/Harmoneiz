import { useState } from "react";
import s from "./index.module.css";
import { taskActions } from "../../actions";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomUid, notify } from "../../utils";
import { PRODUCT_CONSTANTS } from "../../constants/index";

export function NewTask() {
    const { root } = useSelector((state) => state.root);
    const [todoValue, setTodoValue] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if(root.listActiveType){
            let payload = {
                description: "",
                id: generateRandomUid(),
                title: todoValue?.trim(),
                typeId: root.listActiveType,
                status: PRODUCT_CONSTANTS.TO_DO,
                typeTitle: root.listActiveTypeTitle
            }
            dispatch(taskActions.add(payload));
            setTodoValue("");
        } else {
            notify.open({
                type: "error",
                message: "Please Select List Type from the Left Panel before adding task."
            });
        }
    }

    const onTextChange = (e) => {
        setTodoValue(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}
            className={s.addNewForm}
        >
            <FaPlus className={s.plusIcon}/>
            <input 
                type={"text"}
                maxLength={75}
                required={true}
                value={todoValue}
                onChange={onTextChange}
                className={s.addNewInput}
                placeholder={"Add New Task"}
            />
            <button type="submit" className={s.addBtn}>
                Add
            </button>
            <FaArrowRight className={s.mobileAddBtn}/>
        </form>
    )
}