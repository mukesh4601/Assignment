import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    data: [],
}
const CalenderReducer = handleActions({
    CALENDER_DATA: (state, action) => {
        return { ...state, data: action.payload };
    }
}, INITIAL_STATE);

export default CalenderReducer;
