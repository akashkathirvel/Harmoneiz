import { useDispatch, useSelector } from "react-redux";
import { FaLightbulb, FaMoon } from "react-icons/fa";
import { rootActions } from "../../actions";
import { NewTask } from "../new-task";
import s from "./index.module.css";

export function MainBoard(){
    const { root } = useSelector((state) => state.root);
    const dispatch = useDispatch();
    
    const onThemeChange = () => {
        dispatch(rootActions.update({ theme: !(root?.theme) }));
    }

    return (
        <div className={s.mainBoard}>
            <div 
                className={s.themeIcons} 
                onClick={onThemeChange}
            >
                {
                    !(root?.theme) ?
                    <FaMoon className={s.themeIcon}/> :
                    <FaLightbulb className={s.themeIcon}/>
                }
            </div>
            <h1 className={s.activeType}>
                {root?.listActiveTypeTitle || ''}
            </h1>
            <div className={s.banner}></div>
            <NewTask />
        </div>
    );
}