import { NewTask } from "../new-task";
import s from "./index.module.css";

export function MainBoard(){
    return (
        <div className={s.mainBoard}>
            <div className={s.banner}></div>
            <NewTask />
        </div>
    );
}