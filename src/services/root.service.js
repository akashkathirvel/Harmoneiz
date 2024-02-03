import { httpClient } from "../utils";

export const rootService = {
    get,
    update
};

function update(type = {}){
    return httpClient.callApi("PUT", `root`, type, true, false, typeof {});
}

function get(){
    return httpClient.callApi("GET", `root`);
}