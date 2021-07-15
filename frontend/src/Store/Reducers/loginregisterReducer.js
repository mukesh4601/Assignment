import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    login_data: [],
}
const AuthReducer = handleActions({
    LOGIN_DATA: (state, action) => {
        return { ...state, login_data: action.payload };
    }
}, INITIAL_STATE);

export default AuthReducer;
