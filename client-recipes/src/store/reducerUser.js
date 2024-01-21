import * as actionType from './action'

const initialState = {
    Email: "",
    Id: null,
    Name: "",
    Password: "",
    Phone: "",
    tz: "",
    UserName: ""
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_USER:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}
export default UserReducer;
