import axios from "axios"
import * as actionType from "../store/action"
import Swal from "sweetalert2";

export const SetListDispach = (id) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/bay/${id}`).then(res => {
            dispatch({ type: actionType.SET_LIST, payload: res.data })
        }).catch(error => "");
    }
}

export const UpdateListmDispach = (item) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/bay", { ...item }).then(res => {
            dispatch({ type: actionType.UPDATE_LIST, payload: res.data });
            Swal.mixin({
                toast: true, position: "bottom-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
                didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
            }).fire({ icon: "success", title: "המוצר/ים עודכן/נו בהצלחה", });
        }).catch(() => Swal.fire({
            icon: "error", title: "אופס :(", text: "המערכת נתקעה בבעיה", footer: "<div>אי אפשר למחוק עכשיו נסה שוב מאוחר יותר</div>"
        }));
    }
}

export const DeleteItemDispach = (id) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${id}`).then(() => {
            dispatch({ type: actionType.DELETE_ITEM, payload: id });
        }).catch(() => Swal.fire({
            icon: "error", title: "אופס :(", text: "המערכת נתקעה בבעיה", footer: "<div>אי אפשר למחוק עכשיו נסה שוב מאוחר יותר</div>"
        }));
    }
}
