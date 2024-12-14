import { PROGRESS_CONSTANTS } from "../../constants/index";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../actions";
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
    const [tasksState, setTasksState] = useState({});
    const [highlight, setHighlight] = useState('');
    const { root } = useSelector((s) => s.root);
    const { list } = useSelector((s) => s.task);
    const [toEdit, setToEdit] = useState('');
    const dispatch = useDispatch();
    const timeout = useRef(null);


    useEffect(() => {
        if(root.listActiveType){
            dispatch(taskActions.getAll(root.listActiveType));
        }
    }, [root.listActiveType, dispatch]);

    useEffect(() => {
        resetTasksState(true);

        window.addEventListener("resize", function() {
            clearTimeout(timeout.current);
            timeout.current = setTimeout(resetTasksState, 100);
        });
        return () => resetTasksState();
    }, []);

    const resetTasksState = useCallback((force) => {
        if(force || window.innerWidth > 768){
            let defaultTasksState = {};
            Object.keys(PROGRESS_CONSTANTS).forEach((i) => {
                defaultTasksState[PROGRESS_CONSTANTS[i]] = true;
            })
            setTasksState({...defaultTasksState});
        }
    }, []);

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
        let d = (list || []).find(i => i.id === data);
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

    const toggleState = (status = '', state = '') => {
        setTasksState((prev) => ({ ...prev, [status]: !state }));
    }

    const container = (status = "") => {
        const data = list.filter(
            i => i.status === status
        ) || [];

        return (
            <div className={`${s.taskListContainer} ${highlight === status ? s.activeDropBox : ''}`}>
                <h6 className={s.taskStatusTitle}>
                    {status + ` (${data?.length || 0})`}
                    {
                        tasksState[status] && 
                        <MdKeyboardArrowUp 
                            className={s.openCloseArrow} 
                            onClick={() => toggleState(status, tasksState[status])}
                        />
                    }
                    {
                        !tasksState[status] && 
                        <MdKeyboardArrowDown 
                            className={s.openCloseArrow} 
                            onClick={() => toggleState(status, tasksState[status])}
                        />
                    }
                </h6>
            { 
                tasksState[status] &&
                <div 
                    className={s.taskList}
                    onDrop={(e)=>drop(e, status)}
                    onDragOver={(e)=>allowDrop(e, status)}
                >
                    {
                        data.length > 0 ?
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
                        )) : 
                        <p className={s.noTaskTitle}>No Tasks</p>
                    }
                </div>
            }
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