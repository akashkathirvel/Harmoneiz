import { rootService } from "../services";
import { rootConstants } from "../constants/index";

export const rootActions = {
    update,
    get,
};


function update(data = {}) {
    return dispatch => {
        dispatch(request());
        rootService
            .update(data)
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };
    function request() {
        return { type: rootConstants.ADD_REQUEST };
    }
    function success(res) {
        return { type: rootConstants.ADD_SUCCESS, res };
    }
    function error(err) {
        return { type: rootConstants.ADD_ERROR, err };
    }
}

function get() {
    return dispatch => {
        dispatch(request());
        rootService
            .get()
            .then(
                res => dispatch(success(res)), 
                err => dispatch(error(err))
            );
    };

    function request() {
        return { type: rootConstants.GET_REQUEST };
    }
    function success(res) {
        return { type: rootConstants.GET_SUCCESS, res };
    }
    function error(err) {
        return { type: rootConstants.GET_ERROR, err };
    }
}
