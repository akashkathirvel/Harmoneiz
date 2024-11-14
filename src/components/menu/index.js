import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { rootActions } from "../../actions";
import Logo from "../../assets/akLogo.png";
import { FaBars } from "react-icons/fa";
import { TypeList } from "../type-list";
import s from "./index.module.css";

export function Menu() {
    const dispatch = useDispatch();
    const { root } = useSelector((state) => state.root);

    const loadRootData = useCallback(() => {
        dispatch(rootActions.get());
    }, [dispatch]);

    useEffect(() => {
        loadRootData();
    }, [loadRootData]);

    const toggleMenu = () => {
        dispatch(rootActions.update({ leftDrawer:  !(root.leftDrawer) }));
    }

    return (
        <div className={`${s.menuArea} ${root.leftDrawer === undefined || root.leftDrawer ? s.open : s.close}`}>
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