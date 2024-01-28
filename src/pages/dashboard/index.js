import s from "./index.module.css";
import { 
    MainBoard,
    Menu,
} from "../../components";

export function Dashboard() {
    return (
        <div className={s.dashboard}>
            <Menu />
            <MainBoard />
        </div>
    )
}