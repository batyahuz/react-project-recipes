import { useParams } from "react-router-dom";
import AddRecipe from "./addRecipe";
import { useSelector } from "react-redux";

const EditRecipe = () => {
    const { id } = useParams();
    const recipe = useSelector(state => state.recipes.recipes).filter(r => {
        console.log(r?.Id, " id ", id);
        if (`${r?.Id}` === id) return true;
    });
    return <>
        <AddRecipe prop={recipe} />
    </>
}
export default EditRecipe;