import { PRIORITY_CONSTANTS, PROGRESS_CONSTANTS } from "../../constants/index";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import s from "./index.module.css";

export function EditTask(props) {
    const [onEdit, setOnEdit] = useState({});
    const { 
        data, 
        onSave = () => null,
        onClose = () => null
    } = props;

    useEffect(() => {
        if(data)
            setOnEdit(data);
    }, [data]);

    const onChange = (key = '', value = '') => {
        setOnEdit((prev) => ({ ...prev, [key]: value }));
    }

    const onSubmit = () => {
        onSave(onEdit);
    }

    return (
        <div className={s.editPanel}>
            <div className={s.editArea}>
                <div className={s.editTitle}>
                    <span>Edit</span>
                    <MdClose onClick={() => onClose()} className={s.closeIcon}/>
                </div>
                <div className={s.editBody}>
                    <label className={s.label}>Title</label>
                    <input 
                        type={"text"}
                        maxLength={75}
                        required={true}
                        placeholder={"Title"}
                        className={s.titleInput}
                        value={onEdit.title || ''}
                        onChange={(e) => onChange("title", e.target.value)}
                    />
                    <label className={s.label}>Description</label>
                    <textarea 
                        type={"text"}
                        maxLength={300}
                        multiline={"true"}
                        aria-multiline={"true"}
                        placeholder={"Description"}
                        className={s.descriptionInput}
                        value={onEdit.description || ''}
                        onChange={(e) => onChange("description", e.target.value)}
                    />
                    <label className={s.label}>Status</label>
                    <select 
                        className={s.selectInput}
                        value={onEdit.status || ''}
                        onChange={(e) => onChange("status", e.target.value)}
                    >
                        {Object.keys(PROGRESS_CONSTANTS).map((i) => (
                            <option value={PROGRESS_CONSTANTS[i]} key={"PROGRESS_CONSTANTS_"+i}>
                                {PROGRESS_CONSTANTS[i]}
                            </option>
                        ))}
                    </select>
                    <label className={s.label}>Priority</label>
                    <select 
                        className={s.selectInput}
                        value={onEdit.priority || ''}
                        onChange={(e) => onChange("priority", e.target.value)}
                    >
                        {Object.keys(PRIORITY_CONSTANTS).map((i) => (
                            <option value={i} key={"PRIORITY_CONSTANTS_"+i}>
                                {PRIORITY_CONSTANTS[i]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={s.editFooter}>
                    <button onClick={()=> setOnEdit(data)}>Reset</button>
                    <button onClick={()=> onSubmit()}>Confirm</button>
                </div>
            </div>
        </div>
    );
}