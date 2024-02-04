import { PRODUCT_CONSTANTS } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../actions";
import s from "./index.module.css";
import { useEffect } from "react";

let d = [];
export function TaskList() {
    const { root } = useSelector((s) => s.root);
    const { list } = useSelector((s) => s.task);
    const dispatch = useDispatch();


    useEffect(() => {
        if(root.listActiveType){
            dispatch(taskActions.getAll(root.listActiveType));
        }
    }, [root.listActiveType, dispatch]);


    const container = (status = "") => {
        const data = list.filter(
            i => i.status === status
        ) || [];

        return (
            <div className={s.taskListContainer}>
                <h6 className={s.taskStatusTitle}>
                    {status}
                </h6>
                <div className={s.taskList}>
                    {
                        data.map((i) => (
                            <div 
                                id={i.id}
                                key={i.id}
                                className={s.taskDataContainer}
                            >
                                {i?.title || ''}
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