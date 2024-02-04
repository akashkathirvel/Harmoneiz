import { taskService } from "../services";
import { taskConstants } from "../constants/index";

export const taskActions = {
    add,
    get,
    getAll,
    update,
};


function add(data = {}) {
    return dispatch => {
        dispatch(request());
        taskService
            .add(data)
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };
    function request() {
        return { type: taskConstants.ADD_REQUEST };
    }
    function success(res) {
        return { type: taskConstants.ADD_SUCCESS, res };
    }
    function error(err) {
        return { type: taskConstants.ADD_ERROR, err };
    }
}

function get(id = "") {
    return dispatch => {
        dispatch(request());
        taskService
            .get(id)
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };

    function request() {
        return { type: taskConstants.GET_REQUEST };
    }
    function success(res = []) {
        let d = (res || [])?.find(i => i.id === id) || {};
        return { type: taskConstants.GET_SUCCESS, res: d };
    }
    function error(err) {
        return { type: taskConstants.GET_ERROR, err };
    }
}

function getAll(typeId = "") {
    return dispatch => {
        dispatch(request());
        taskService
            .getAll(typeId)
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };

    function request() {
        return { type: taskConstants.GET_ALL_REQUEST };
    }
    function success(res = []) {
        let d = (res || [])?.filter(i => i.typeId === typeId);
        return { type: taskConstants.GET_ALL_SUCCESS, res: d };
    }
    function error(err) {
        return { type: taskConstants.GET_ALL_ERROR, err };
    }
}

function update(data = {}) {
    return dispatch => {
        dispatch(request());
        taskService
            .update(data)
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };
    function request() {
        return { type: taskConstants.UPDATE_REQUEST };
    }
    function success(res) {
        return { type: taskConstants.UPDATE_SUCCESS, res };
    }
    function error(err) {
        return { type: taskConstants.UPDATE_ERROR, err };
    }
}
