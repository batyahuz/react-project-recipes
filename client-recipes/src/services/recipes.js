import axios from "axios"
import * as actionType from "../store/action"
import Swal from "sweetalert2"

export const SetRecipesDispach = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/recipe").then(res => {
            dispatch({ type: actionType.SET_RECIPES, payload: res.data })
        })
    }
}

export const AddRecipeDispach = (userId, ingredients, instructions, data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/recipe", {
            UserId: userId, Ingrident: ingredients, Instructions: instructions,
            CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty,
            Description: data.Description, Name: data.Name
        }).then(res => {
            dispatch({ type: actionType.ADD_RECIPE, payload: res.data });
            Swal.fire({ position: "center", icon: "success", title: "המתכון נוסף בהצלחה", showConfirmButton: false, timer: 1500 });
        }).catch(error => { console.log(error); Swal.fire({ title: "אויש", text: error.data, icon: "error", confirmButtonColor: PurpleColor() }); });
    }
}

export const EditRecipeDispach = (id, userId, ingredients, instructions, data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/recipe/edit", {
            Id: id, UserId: userId, Ingrident: ingredients, Instructions: instructions, CategoryId: data.CategoryId,
            Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description, Name: data.Name
        }).then(res => {
            dispatch({ type: actionType.EDIT_RECIPE, payload: res.data });
            Swal.fire({ position: "center", icon: "success", title: "המתכון עודכן בהצלחה", showConfirmButton: false, timer: 1500 });
        }).catch(error => { console.log(error); Swal.fire({ title: "אויש", text: error.data, icon: "error", confirmButtonColor: PurpleColor() }) });
    }
}

export const DeleteRecipeDispach = (id) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/delete/${id}`).then(() => {
            dispatch({ type: actionType.DELETE_RECIPE, payload: id });
            Swal.fire({ position: "center", icon: "success", title: "המתכון נמחק בהצלחה", showConfirmButton: false, timer: 1500 });
        }).catch(() => Swal.fire({
            icon: "error", title: "אופס :(", text: "המערכת נתקעה בבעיה", footer: "<div>אי אפשר למחוק עכשיו נסה שוב מאוחר יותר</div>"
        }))
    }
}
