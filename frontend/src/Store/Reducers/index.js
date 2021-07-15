import { combineReducers } from "redux";
import LoginRegisterReducer from "./loginregisterReducer";
import CalenderDateReducer from "./CalenderDataReducer"
export default combineReducers({
    loginregister: LoginRegisterReducer,
    calender: CalenderDateReducer
})