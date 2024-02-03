import store from "../../reducers";
import { useState } from "react";
import s from "./index.module.css";
import { FaPlus } from "react-icons/fa";
import { generateRandomUid } from "../../utils";
import { listTypeActions } from "../../actions";

const demo = [
    { title: "Personal", id: "kjasdf" },
    { title: "Work", id: "woieur" }
]

export function TypeList(props) {
    const [listTitle, setListTitle] = useState('');
    const {
        active = '',
        setActive = () => null
    } = props;


    const onSubmit = (e) => {
        e.preventDefault();
        if(listTitle?.trim()){
            let payload = {
                id: generateRandomUid(),
                title: listTitle?.trim()
            }
            store.dispatch(listTypeActions.add(payload));
            setListTitle("");
        }
    }

    const onTextChange = (event) => {
        setListTitle(event.target.value);
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
            {
                demo.map((item, index) => (
                        <div 
                            onClick={() => setActive(item.id)}
                            className={`${s.listData} ${item.id === active? s.active : ''}`}
                        >
                            {item.title}
                        </div>
                    )
                )
            }
            {
                !(demo.length) &&
                <div className={s.listData}>No Type Found</div>
            }
        </div>
    )
}