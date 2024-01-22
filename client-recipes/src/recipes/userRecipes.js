import { useSelector } from "react-redux"
import FilterRecipes from "./filterRecipes";

const UserRecipes = () => {
    const { id } = useSelector(state => ({ id: state.user.Id }));
    return <>
        <FilterRecipes id={id} />
    </>
}
export default UserRecipes;