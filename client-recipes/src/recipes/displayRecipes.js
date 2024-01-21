import { useSelector } from "react-redux"
import RecipeCard from "./recipeCard"
import { Link } from "react-router-dom";
import { useEffect } from "react";

const DisplayRecipes = ({ id, durationMin, durationMax, difficultyMin, difficultyMax, categoriesId }) => {
    const recipes = useSelector(state => state.recipes.recipes);

    useEffect(() => {

    }, [recipes]);

    return <>
        <div style={Object.assign({ display: "flex" }, { flexWrap: "wrap" }, { alignItems: "center" }, { justifyContent: "space-around" })}>
            {recipes.map(r => {
                return <div key={r.Id} style={Object.assign({ width: "400px" })}>
                    {
                        (!id || id === parseInt(r.UserId)) &&
                        (!durationMin || durationMin <= r.Duration) &&
                        (!durationMax || durationMax >= r.Duration) &&
                        (!difficultyMin || difficultyMin <= r.Difficulty) &&
                        (!difficultyMax || difficultyMax >= r.Difficulty) &&
                        (!categoriesId || categoriesId.length === 0 || categoriesId.find(c => c[0] === r.CategoryId)) &&
                        <RecipeCard recipe={r} />
                    }
                </div>
            })}
        </div >
        <Link to={"/addRecipe"}><button>להוספת מתכון</button></Link>
    </>
}
export default DisplayRecipes;