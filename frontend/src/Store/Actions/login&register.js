import Cookies from "js-cookie";
import { createAction } from "redux-actions";
import axios from "../axios";



const LOGIN_DATA = createAction("LOGIN_DATA");
export const Loginuser = values => (dispatch) => {
    return axios({
        method: 'post',
        url: "login",
        data: values
    }).then(res => {
        Cookies.set("token", res.data.item.token)
        dispatch(LOGIN_DATA(res.data.item));
    })
};


export const Register = values => (dispatch) => {
    return axios({
        method: 'post',
        url: "register",
        data: values
    })
};