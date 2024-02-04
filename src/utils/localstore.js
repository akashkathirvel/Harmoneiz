import { CONSTANTS } from "../constants";

export const localstore = {
    addValue,
    getValue,
    setValue,
    clearAll,
    deleteValue,
    updateValue,
    removeValue
}

function getValue(key = ""){
    let d = localStorage.getItem(CONSTANTS.STORE_KEY + key) || "";
    return d ? JSON.parse(d) : d;
}

function setValue(key = "", value = ""){
    if(key)
        localStorage.setItem(CONSTANTS.STORE_KEY + key, JSON.stringify(value));
}

function deleteValue(key = "", payload = null){
    if(payload){
        removeValue(key, payload);
    } else {
        localStorage.removeItem(CONSTANTS.STORE_KEY + key);
    }
}

function clearAll(){
    localStorage.clear();
}

function addValue(key = "", value = {}){
    let data = getValue(key) || [];
    data.push(value);
    setValue(key, data); 
}

function updateValue(key = "", value = {}, type = "list"){
    let data = null;
    if(type === "list"){
        data = getValue(key) || [];
        data.push(value);
        setValue(key, data); 
    } else if(type === typeof {}) {
        data = Object.assign(getValue(key) || {}, value);
        setValue(key, data); 
    }
    return data;
}

function removeValue(key = '', id = '') {
    let data = getValue(key) || [];
    data = data.filter((o) => o.id !== id);
    setValue(key, data); 
}