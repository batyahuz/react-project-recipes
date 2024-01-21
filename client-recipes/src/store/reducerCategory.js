import * as actionType from './action'

const initialState = {
    categories: []
}

function CategoryReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_CATEGORIES: {
            return { ...state, categories: action.payload }
        }
        case actionType.ADD_CATEGORY: {
            const categories = [...state.categories.categories];
            categories.push(action.payload);
            return { ...state, categories }
        }
        default: {
            return { ...state }
        }
    }
}
export default CategoryReducer;
