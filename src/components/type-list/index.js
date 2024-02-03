import s from "./index.module.css";
import { useEffect, useState } from "react";
import { generateRandomUid } from "../../utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { listTypeActions, rootActions } from "../../actions";

export function TypeList() {
    const dispatch = useDispatch();
    const [listTitle, setListTitle] = useState('');
    const { list } = useSelector((state) => state.listtype);
    const { root } = useSelector((state) => state.root);

    useEffect(() => {
        dispatch(listTypeActions.get());
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if(listTitle?.trim()){
            let payload = {
                id: generateRandomUid(),
                title: listTitle?.trim()
            }
            dispatch(listTypeActions.add(payload));
            setListTitle("");
        }
    }

    const onTextChange = (event) => {
        setListTitle(event.target.value);
    }

    const onClickListType = (id = "", title = "") => {
        let payload = {
            listActiveType: id,
            listActiveTypeTitle: title
        }
        dispatch(rootActions.update( payload ));
    }

    const onDeleteListType = (id = "") => {
        
    }

    return (
        <div className={s.lists}>
            <label className={s.sectionLabel}>
                Lists
            </label>
            <form 
                onSubmit={onSubmit}
                className={s.addNewForm}
            >
                <input 
                    type="text"
                    required={true}
                    value={listTitle}
                    onChange={onTextChange}
                    className={s.addNewInput}
                    placeholder={"Add New Type"}
                />
                <button 
                    type="submit"
                    className={s.addBtn}
                >
                    <FaPlus className={s.plusIcon}/>
                </button>
            </form>
            <div className={s.listTypeList}>
                {
                    (list || [])?.map((item) => (
                            <div 
                                id={item.id}
                                key={item.id}
                                onClick={() => onClickListType(item.id, item.title)}
                                className={`${s.listData} ${
                                    item.id === root?.listActiveType ? s.active : ''
                                }`}
                            >
                                {item.title}
                                <FaTrash 
                                    className={s.listIcons}
                                    onClick={() => onDeleteListType(item.id)}
                                />
                            </div>
                        )
                    )
                }
                {
                    !(list?.length) &&
                    <div className={s.listData}>No Type Found</div>
                }
            </div>
        </div>
    )
}