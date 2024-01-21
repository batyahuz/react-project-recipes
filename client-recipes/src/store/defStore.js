import { createStore, combineReducers, applyMiddleware } from 'redux';
import User from "./reducerUser";
import Recipe from './reducerRecipe';
import Category from './reducerCategory';
import List from './reducerList';
import { thunk } from 'redux-thunk';

const reducers = combineReducers({
    user: User,
    recipes: Recipe,
    categories: Category,
    list: List
})
const store = createStore(reducers, applyMiddleware(thunk));

export default store;