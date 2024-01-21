import * as actionType from './action'

const initialState = {
    recipes: []
}

function RecipeReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_RECIPES: {
            return { ...state, recipes: action.payload }
        }
        case actionType.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.payload);
            return { ...state, recipes }
        }
        case actionType.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            recipes[recipes.findIndex(x => x.Id == action.payload.Id)] = action.payload;
            return { ...state, recipes }
        }
        case actionType.DELETE_RECIPE: {
            const recipes = state.recipes.filter(r => r.Id != action.payload);
            return { ...state, recipes }

        }
        default: {
            return { ...state }
        }
    }
}
export default RecipeReducer;
