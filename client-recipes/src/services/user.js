import axios from "axios"
import * as actionType from '../store/action'
import { PurpleColor } from "../general-fields/colors";

export const LogInDispach = (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/login", { Username: data.Username, Password: data.Password })
            .then(res => {
                dispatch({ type: actionType.SET_USER, payload: res.data })
            }).catch(error => {
                Swal.fire({
                    title: "אויש", icon: "error", confirmButtonColor: PurpleColor(), timer: 1500,
                    text: `${error.data === "" ? "אתה עדין לא רשום או שהססמא שגויה 🙁" : error.response.data}`
                });
            });
    }
}

export const SignInDispach = (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", {
            Username: data.Username, Password: data.Password, Name: data.Name,
            Phone: data.Phone, Email: data.Email, Tz: data.Tz
        }).then(res => {
            dispatch({ type: actionType.SET_USER, payload: res.data })
        }).catch(error => Swal.fire({
            title: "אויש", text: error.response.data, icon: "error", confirmButtonColor: PurpleColor(), timer: 1500
        }));
    }
}
