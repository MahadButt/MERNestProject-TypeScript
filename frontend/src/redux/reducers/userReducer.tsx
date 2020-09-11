import { ADD_USER,USER_DATA } from '../actions/userType'
const initialState: any = {
    firstname: "",
    lastname: "",
    email: "",
    users: [],
    message: "",
    usercreated: ""
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_USER: return {
            ...state,
            usercreated: action.usercreated,
            message: action.payload
        }
        case USER_DATA: return {
            ...state,
            users: action.payload
        }
        default: return state;
    }
}
export default userReducer;