import s from "./index.module.css";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomUid, notify } from "../../utils";
import { listTypeActions, rootActions } from "../../actions";

export function TypeList() {
    const dispatch = useDispatch();
    const [listTitle, setListTitle] = useState('');
    const { root } = useSelector((state) => state.root);
    const { list } = useSelector((state) => state.listtype);

    useEffect(() => {
        dispatch(listTypeActions.get());
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        let value = listTitle?.trim();
        let existing = (list || []).find((i) => i.title === value);
        if(value && !existing){
            let payload = {
                id: generateRandomUid(),
                title: listTitle?.trim()
            }
            dispatch(listTypeActions.add(payload));
            onClickListType(payload.id, payload.title);
            setListTitle("");
        } else if(existing) {
            notify.open({ 
                type: "error", 
                message: "List Type already Exists."
            });
        }
    }

    const onTextChange = (event) => {
        setListTitle(event.target.value);
    }

    const onClickListType = (id = "", title = "") => {
        let payload = {
            listActiveType: id,
            listActiveTypeTitle: title,
            leftDrawer: !(window.innerWidth <= 768),
        }
        dispatch(rootActions.update( payload ));
    }

    const onDeleteListType = (e, id = "") => {
        e.preventDefault();
        dispatch(listTypeActions.remove(id));
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
                    maxLength={25}
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
                                    onClick={(e) => onDeleteListType(e, item.id)}
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