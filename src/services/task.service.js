import { httpClient } from "../utils";

export const taskService = {
    add,
    get,
    getAll,
    update
};


function get(id = ''){
    return httpClient.callApi("GET", `task`);
}

function add(data = {}){
    return httpClient.callApi("POST", `task`, data);
}

function getAll(typeId = ''){
    return httpClient.callApi("GET", `task`);
}

function update(data = {}){
    return httpClient.callApi("PUT", `task`, data);
}