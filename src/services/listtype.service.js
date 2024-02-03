import { httpClient } from "../utils";

export const listTypeService = {
    add,
    get,
};

function add(type = {}){
    return httpClient.callApi("POST", `types`, type);
}

function get(){
    return httpClient.callApi("GET", `types`);
}