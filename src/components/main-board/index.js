import { FaLightbulb, FaMoon, FaLock, FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TaskList, NewTask, PinPanel } from "../";
import { rootActions } from "../../actions";
import s from "./index.module.css";

export function MainBoard(){
    const { root } = useSelector((state) => state.root);
    const dispatch = useDispatch();
    
    const onThemeChange = () => {
        dispatch(rootActions.update({ theme: !(root?.theme) }));
    }

    const onLockUnLock = () => {
        dispatch(rootActions.update({ locked: !(root.locked) }));
    }

    const onPinSet = (pin) => {
        dispatch(rootActions.update({ pin: btoa(pin) }));
        onLockUnLock();
    }

    return (
        <div className={s.mainBoard}>
            <div className={s.topSection}>
                <div 
                    onClick={onLockUnLock}
                    className={s.lockIcons}
                    title={root.locked ? "UNLOCK" : "LOCK"}
                >
                    {
                        !(root?.locked) ?
                        <FaLock className={s.lockIcon}/> :
                        <FaUnlock className={s.lockIcon}/>
                    }
                </div>
                <div 
                    className={s.themeIcons} 
                    onClick={onThemeChange}
                    title="THEME"
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
            <TaskList />
            {
                root.locked && !(root.pin) ?
                <div className={s.lockPinPanel}>
                    <PinPanel   
                        showClose={true}
                        onSubmit={onPinSet}
                        onClose={onLockUnLock}                     
                        title={"Create Your PIN"}
                    />
                </div> : ''
            }
        </div>
    );
}