import axios from 'axios';
import * as actionType from './action'
import { useSelector } from 'react-redux';

const initialState = {
    list: []
}

function ListReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_LIST: {
            return { ...state, list: action.payload }
        }
        case actionType.UPDATE_LIST: {
            const list = [...state.list];
            const findIndex = list.findIndex(x => x.Id === action.payload.Id);
            if (findIndex >= 0)
                list[findIndex] = action.payload;
            else
                list.push(action.payload);
            return { ...state, list: list }
        }
        case actionType.DELETE_ITEM: {
            const list = [...state.list].filter(x => x.Id !== action.payload && x.Count !== -1);
            return { ...state, list: list }
        }
        default: {
            return { ...state }
        }
    }
}
export default ListReducer;
