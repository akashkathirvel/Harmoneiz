import { listTypeService } from "../services";
import { listTypeConstants } from "../constants/index";

export const listTypeActions = {
    add,
    get,
};


function add(type = {}) {
  return dispatch => {
    dispatch(request());
    listTypeService
      .add(type)
      .then(
        res => dispatch(success(res)), 
        err => dispatch(error(err))
      );
  };
  function request() {
    return { type: listTypeConstants.ADD_REQUEST };
  }
  function success(res) {
    return { type: listTypeConstants.ADD_SUCCESS, res };
  }
  function error(err) {
    return { type: listTypeConstants.ADD_ERROR, err };
  }
}

function get() {
  return dispatch => {
    dispatch(request());
    listTypeService
      .get()
      .then(
        res => dispatch(success(res)), 
        err => dispatch(error(err))
      );
  };

  function request() {
    return { type: listTypeConstants.GET_REQUEST };
  }
  function success(res) {
    return { type: listTypeConstants.GET_SUCCESS, res };
  }
  function error(err) {
    return { type: listTypeConstants.GET_ERROR, err };
  }
}
