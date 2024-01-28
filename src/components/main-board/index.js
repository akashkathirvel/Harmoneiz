import { FaLightbulb, FaMoon } from "react-icons/fa";
import { NewTask } from "../new-task";
import s from "./index.module.css";
import { useState } from "react";

export function MainBoard(){
    const [themeLight, setThemeLight] = useState(true);
    
    return (
        <div className={s.mainBoard}>
            <div 
                className={s.themeIcons} 
                onClick={() => setThemeLight((prev) => !prev)}
            >
                {
                    themeLight ?
                    <FaMoon className={s.themeIcon}/> :
                    <FaLightbulb className={s.themeIcon}/>
                }
            </div>
            <div className={s.banner}></div>
            <NewTask />
        </div>
    );
}