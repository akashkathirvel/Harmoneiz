import { PRODUCT_CONSTANTS } from "../../constants/index";
import s from "./index.module.css";

let d = [];
export function TaskList() {

    const container = (status = "") => {
        return (
            <div className={s.taskListContainer}>
                <h6 className={s.taskStatusTitle}>
                    {status}
                </h6>
                <div className={s.taskList}>
                    {
                        d.map((i) => (
                            <div className={s.taskDataContainer}>
                                New {status}
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={s.tasklistBoard}>
            {container(PRODUCT_CONSTANTS.TO_DO)}
            {container(PRODUCT_CONSTANTS.IN_PROGRESS)}
            {container(PRODUCT_CONSTANTS.DONE)}
        </div>
    );
}