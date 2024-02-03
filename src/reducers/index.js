// Redux
import { applyMiddleware, combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {thunk} from 'redux-thunk';

import { listtype } from "./listtype.reducer";
import { root } from "./root.reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "listtype", 
    "root"
  ]
};

// Middlewares
const middleware = () => {
  return applyMiddleware(thunk);
};


const pReducer = persistReducer(
  persistConfig,
  combineReducers({
    listtype,
    root
  })
);

export default createStore(pReducer, middleware());