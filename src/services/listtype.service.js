import { httpClient } from "../utils";

export const listTypeService = {
    add,
    get,
    update
};

function add(type = {}){
    return httpClient.callApi("POST", `types`, type);
}

function update(type = {}){
    return httpClient.callApi("PUT", `types`, type);
}

function get(){
    return httpClient.callApi("GET", `types`);
}