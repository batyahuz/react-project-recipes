import axios from "axios"
import * as ActionType from "../store/action"

export const SetCategoriesDispach = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/category").then(res => {
            dispatch({ type: ActionType.SET_CATEGORIES, payload: res.data })
        });
    }
}

export const AddCategory = (name) => {
    return axios.post("http://localhost:8080/api/category", { Id: 0, Name: name })
}