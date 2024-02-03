import { rootConstants } from "../constants/index";

const initialState = {
  status: "",
  root: {}
};

export function root(state = initialState, action) {
    switch (action.type) {
        case rootConstants.GET_REQUEST:
            return {
                ...state,
                status: "GET_REQUEST"
            }; 
        case rootConstants.GET_SUCCESS:
            return {
                ...state,
                root: action.res,
                status: "GET_SUCCESS"
            }; 
        case rootConstants.GET_ERROR:
            return {
                ...state,
                status: "GET_ERROR"
            };
        case rootConstants.ADD_REQUEST:
            return {
                ...state,
                status: "ADD_REQUEST"
            }; 
        case rootConstants.ADD_SUCCESS:
            return {
                ...state,
                root: { ...(state.root), ...(action.res) },
                status: "ADD_SUCCESS"
            }; 
        case rootConstants.ADD_ERROR:
            return {
                ...state,
                status: "ADD_ERROR"
            };        
        default:
            return state;
    }
}