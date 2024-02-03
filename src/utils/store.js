import { CONSTANTS } from "../constants";

export const datastore = {
    getValue,
    setValue,
    clearAll,
    removeValue
}

function getValue(key = ""){
    return localStorage.getItem(CONSTANTS.STORE_KEY + key) || "";
}

function setValue(key = "", value = ""){
    if(key)
        localStorage.setItem(CONSTANTS.STORE_KEY + key, value);
}

function removeValue(key = ""){
    localStorage.removeItem(CONSTANTS.STORE_KEY + key);
}

function clearAll(){
    localStorage.clear();
}