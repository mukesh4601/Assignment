import { createAction } from "redux-actions";
import axios from "../axios";
import Cookies from "js-cookie"



const CALENDER_DATA = createAction("CALENDER_DATA");
export const CalenderData = values => (dispatch) => {
    return axios({
        method: 'post',
        url: "calender-data",
        data: values,
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => {
        dispatch(CALENDER_DATA(res.data.item));
    })
};
