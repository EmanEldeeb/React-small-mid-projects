import { createStore, combineReducers, applyMiddleware } from "redux";
import accountReducer from "./features/account/AccountSlice";
import custmorReducer from "./features/Custmor/customrSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: custmorReducer,
});
// ////////////////////////////////////////////////////////////////////
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
