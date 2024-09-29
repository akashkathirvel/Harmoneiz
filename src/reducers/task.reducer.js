import { taskConstants } from "../constants/index";

const initialState = {
    status: "",
    data: {},
    list: []
};

export function task(state = initialState, action) {
    switch (action.type) {
        case taskConstants.GET_REQUEST:
            return {
                ...state,
                status: "GET_REQUEST"
            }; 
        case taskConstants.GET_SUCCESS:
            return {
                ...state,
                data: action.res,
                status: "GET_SUCCESS"
            }; 
        case taskConstants.GET_ERROR:
            return {
                ...state,
                status: "GET_ERROR"
            };
        case taskConstants.GET_ALL_REQUEST:
            return {
                ...state,
                status: "GET_ALL_REQUEST"
            }; 
        case taskConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                list: action.res,
                status: "GET_ALL_SUCCESS"
            }; 
        case taskConstants.GET_ALL_ERROR:
            return {
                ...state,
                status: "GET_ALL_ERROR"
            };
        case taskConstants.ADD_REQUEST:
            return {
                ...state,
                status: "ADD_REQUEST"
            }; 
        case taskConstants.ADD_SUCCESS:
            return {
                ...state,
                list: [ ...(state.list), action.res ],
                status: "ADD_SUCCESS"
            }; 
        case taskConstants.ADD_ERROR:
            return {
                ...state,
                status: "ADD_ERROR"
            };
        case taskConstants.UPDATE_REQUEST:
            return {
                ...state,
                status: "UPDATE_REQUEST"
            }; 
        case taskConstants.UPDATE_SUCCESS:
            return {
                ...state,
                list: state.list?.filter(i => i.id === action.res?.id ? action.res : i),
                status: "UPDATE_SUCCESS"
            }; 
        case taskConstants.UPDATE_ERROR:
            return {
                ...state,
                status: "UPDATE_ERROR"
            };  
        case taskConstants.DELETE_REQUEST:
            return {
                ...state,
                status: "DELETE_REQUEST"
            }; 
        case taskConstants.DELETE_SUCCESS:
            return {
                ...state,
                list: state.list?.filter(i => i.id !== action.res?.id),
                status: "DELETE_SUCCESS"
            }; 
        case taskConstants.DELETE_ERROR:
            return {
                ...state,
                status: "DELETE_ERROR"
            };       
        default:
            return state;
    }
}