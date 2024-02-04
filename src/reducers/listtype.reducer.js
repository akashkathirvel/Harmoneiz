import { listTypeConstants } from "../constants/index";

const initialState = {
  status: "",
  list: []
};

export function listtype(state = initialState, action) {
  switch (action.type) {
    case listTypeConstants.GET_REQUEST:
      return {
        ...state,
        status: "GET_REQUEST"
      }; 
    case listTypeConstants.GET_SUCCESS:
      return {
        ...state,
        list: action.res,
        status: "GET_SUCCESS"
      }; 
    case listTypeConstants.GET_ERROR:
      return {
        ...state,
        status: "GET_ERROR"
      };
    case listTypeConstants.ADD_REQUEST:
      return {
        ...state,
        status: "ADD_REQUEST"
      }; 
    case listTypeConstants.ADD_SUCCESS:
      return {
        ...state,
        list: [ ...(state.list), action.res],
        status: "ADD_SUCCESS"
      }; 
    case listTypeConstants.ADD_ERROR:
      return {
        ...state,
        status: "ADD_ERROR"
      };        
    case listTypeConstants.DELETE_REQUEST:
      return {
        ...state,
        status: "DELETE_REQUEST"
      }; 
    case listTypeConstants.DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((i) => i.id !== action.res),
        status: "DELETE_SUCCESS"
      }; 
    case listTypeConstants.DELETE_ERROR:
      return {
        ...state,
        status: "DELETE_ERROR"
      };        
    default:
      return state;
  }
}
