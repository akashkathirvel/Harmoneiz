import { useState } from "react";
import s from "./index.module.css";
import { MdClose } from "react-icons/md";
import { FaBackspace, FaCheck } from "react-icons/fa";

export function PinPanel(props) {
    const [err, setErr] = useState(false);
    const [pin, setPin] = useState('');
    const { 
        title = '',
        error = false,
        showClose = false,
        onClose = () => null,
        onSubmit = () => null 
    } = props;

    const onBtnClick = (key = '') => {
        if(key === "B"){
            setPin((prev) => prev.slice(0, -1));
        } else if(key === "S") {
            if(pin.length === 4){
                onSubmit(pin);
            } else {
                setErr(true);
            }
        } else if(pin.length < 4){
            setPin((prev) => (prev + key));
            setErr(false);
        }
    }
    
    const renderKeyPad = (key = '', child) => {
        if(!key)
            return null;
        
        return (
            <div 
                id={"keypad_"+key}
                key={"keypad_"+key}
                className={s.keypad} 
                onClick={() => onBtnClick(key)}
            >
                {child || key}
            </div>
        )
    }

    return (
        <div className={s.pinPanel}>
            {
                showClose && 
                <div className={s.closeIcon} onClick={onClose}>
                    <MdClose />
                </div>
            }
            <div className={s.title}>
                {title}
            </div>
            <div className={s.inputArea}>
                {[0,1,2,3].map((i) => (
                    <div 
                        className={`${s.inputs} ${(err || error) ? s.error : ''}`} 
                        key={"input_"+i}
                    >
                        {pin[i] || ''}
                    </div>
                ))}
            </div>
            <div className={s.keyPadArea}>
                {['1','2','3','4','5','6','7','8','9'].map((item) => renderKeyPad(item))}
                {renderKeyPad('B', <FaBackspace />)}
                {renderKeyPad('0')}
                {renderKeyPad('S', <FaCheck />)}
            </div>
        </div>
    )
}