import { httpClient } from "../utils";

export const listTypeService = {
    add,
    get,
    update,
    remove
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

function remove(id = ''){
    return httpClient.callApi("DELETE", `types`, id);
}