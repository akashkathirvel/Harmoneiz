import Logo from "../../assets/akLogo.png";
import { FaBars } from "react-icons/fa";
import { TypeList } from "../type-list";
import s from "./index.module.css";
import { useState } from "react";

export function Menu() {
    const [menu, setMenu] = useState(true);

    const toggleMenu = () => {
        setMenu((prev) => !prev);
    }

    return (
        <div className={`${s.menuArea} ${menu ? s.open : s.close}`}>
            <div className={s.iconsArea}>
                <img 
                    alt={"AK"}
                    src={Logo} 
                    onClick={toggleMenu}
                    className={s.akHeaderImage}
                />
                <FaBars 
                    className={s.icon} 
                    onClick={toggleMenu}
                />
            </div>
            <div className={s.flexLists}>
                <TypeList />
            </div>
        </div>
    )
}