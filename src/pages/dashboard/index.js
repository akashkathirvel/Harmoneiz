import { 
    MainBoard,
    PinPanel,
    Menu,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { rootActions } from "../../actions";
import s from "./index.module.css";
import { useState } from "react";

export function Dashboard() {
    const { root } = useSelector((state) => state.root);
    const [ error, setError ] = useState(false);
    const dispatch = useDispatch();

    const onLockUnLock = () => {
        dispatch(rootActions.update({ locked: !(root.locked) }));
    }

    const onPinSubmit = (pin) => {
        if(btoa(pin) === root.pin){
            setError(false);
            onLockUnLock();
        } else {
            setError(true);
        }
    }
    
    if(root.locked && root.pin) {
        return (
            <div className={s.lockBoard}>
                <div className={s.lockPanel}>
                    <PinPanel          
                        error = {error}             
                        onSubmit={onPinSubmit}
                        title={"Enter Your PIN"}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={s.dashboard}>
            <Menu />
            <MainBoard />
        </div>
    )
}