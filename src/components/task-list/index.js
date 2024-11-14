import { PROGRESS_CONSTANTS } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../actions";
import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
import s from "./index.module.css";
import { EditTask } from "../";
import { 
    MdKeyboardArrowUp, 
    MdKeyboardArrowDown,
    MdKeyboardDoubleArrowUp,
    MdKeyboardDoubleArrowDown 
} from "react-icons/md";

export function TaskList() {
    const [highlight, setHighlight] = useState('');
    const { root } = useSelector((s) => s.root);
    const { list } = useSelector((s) => s.task);
    const [toEdit, setToEdit] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        if(root.listActiveType){
            dispatch(taskActions.getAll(root.listActiveType));
        }
    }, [root.listActiveType, dispatch]);

    const drag = (e, data, from) => {
        e.dataTransfer.setData("text", data.id, from);
    }

    const allowDrop = (e, onBox) => {
        e.preventDefault();
        setHighlight(onBox);
    }

    const drop = (e, dropBox) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        let d = list.find(i => i.id === data);
        if(d){
            d.status = dropBox;
            dispatch(taskActions.update(d));
        }
        setHighlight('');
    }

    const dragEnd = (e) => {
        e.preventDefault();
        setHighlight('');
    }

    const onEdit = (data) => {
        setToEdit(data);
    }

    // const onDelete = (e, data) => {
    //     e.preventDefault();
    // }

    const onUpdate = (data) => {
        dispatch(taskActions.update(data));
        setToEdit('');
        setTimeout(() => window.location.reload(), 0);
    }

    const container = (status = "") => {
        const data = list.filter(
            i => i.status === status
        ) || [];

        return (
            <div className={`${s.taskListContainer} ${highlight === status ? s.activeDropBox : ''}`}>
                <h6 className={s.taskStatusTitle}>
                    {status}
                </h6>
                <div 
                    className={s.taskList}
                    onDrop={(e)=>drop(e, status)}
                    onDragOver={(e)=>allowDrop(e, status)}
                >
                    {
                        data.map((i) => (
                            <div 
                                id={i.id}
                                key={i.id}
                                draggable="true"
                                onClick={()=>onEdit(i)}
                                onDragEnd={(e)=>dragEnd(e)}
                                className={s.taskDataContainer}
                                onDragStart={(e)=>drag(e, i, status)}
                            >
                                {i?.title || ''}
                                <div className={s.iconsArea}>
                                    {/* <FaTrash 
                                        className={s.listIcons}
                                        onClick={(e) => onDelete(e, i)}
                                    /> */}
                                    {i.priority === "0" && <MdKeyboardDoubleArrowDown className={s.low}/>}
                                    {i.priority === "1" && <MdKeyboardArrowDown className={s.medium}/>}
                                    {i.priority === "2" && <MdKeyboardArrowUp className={s.high}/>}
                                    {i.priority === "3" && <MdKeyboardDoubleArrowUp className={s.very_high}/>}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={s.tasklistBoard}>
                {container(PROGRESS_CONSTANTS.TO_DO)}
                {container(PROGRESS_CONSTANTS.IN_PROGRESS)}
                {container(PROGRESS_CONSTANTS.DONE)}
            </div>
            {   
                toEdit &&
                <EditTask 
                    data={toEdit} 
                    onSave={onUpdate}
                    onClose={()=>setToEdit('')}
                />
            }
        </>
    );
}