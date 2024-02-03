import { useState } from "react";
import s from "./index.module.css";
import { generateRandomUid } from "../../utils";
import { FaArrowRight, FaPlus } from "react-icons/fa";

export function NewTask() {
    const [todoValue, setTodoValue] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(todoValue, generateRandomUid());
        setTodoValue("");
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
                type="text"
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