import axios from "axios"
import * as ActionType from "../store/action"

export const SetCategoriesDispach = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/category").then(res => {
            console.log("SetCategoriesDispach",res);
            console.log("SetCategoriesDispach .data",res.data);
            dispatch({ type: ActionType.SET_CATEGORIES, payload: res.data })
        }).catch(error => { "SetCategoriesDispach", console.log("SetCategoriesDispach", error); })
    }
}

export const AddCategory = (name) => {
    return axios.post("http://localhost:8080/api/category", { Id: 0, Name: name })
}