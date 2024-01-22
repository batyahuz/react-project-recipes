import { Route, Routes } from "react-router-dom";
import Home from './home'
import LogIn from '../users/login';
import SignIn from '../users/signin';
import AddRecipe from '../recipes/addRecipe';
import EditRecipe from '../recipes/editRecipe';
import AddCategory from '../categories/addCategory';
import SingleRecipe from "../recipes/singleRecipe";
import FilterRecipes from "../recipes/filterRecipes";
import UserRecipes from "../recipes/userRecipes";
import Shopping from "../shopping-list/shopping";

const RoutesComp = () => {
    return <Routes>

        <Route path="/home" element={<Home />} />

        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
        <Route path="/displayRecipes" element={<FilterRecipes />} />
        <Route path="/displayUserRecipes" element={<UserRecipes />} />
        <Route path="/singleRecipe/:id" element={<SingleRecipe />} />

        <Route path="/shopping" element={<Shopping />} />

        <Route path="/addCategory" element={<AddCategory />} />
    </Routes>
}
export default RoutesComp;