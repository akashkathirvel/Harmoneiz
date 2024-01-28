import { FaBars } from "react-icons/fa";
import Logo from "../../assets/akLogo.png";
import s from "./index.module.css";
import { useState } from "react";
import { TypeList } from "../type-list";

export function Menu() {
    const [menu, setMenu] = useState(true);
    const [active, setActive] = useState("");

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
                <TypeList 
                    active={active}
                    setActive={setActive}
                />
            </div>
        </div>
    )
}