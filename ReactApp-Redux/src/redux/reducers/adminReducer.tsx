import { SIGNUP_ADMIN, LOGIN_ADMIN,DELETE_ADMIN,EDIT_ADMIN } from '../actions/adminType'
const initialState: any = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    message: "",
    isRegisterd: "",
    isLoggedIn: "",
    isEdited:""
}

const adminuserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP_ADMIN: return {
            ...state,
            isRegisterd: action.isRegisterd,
            message: action.payload
        }
        case LOGIN_ADMIN: return {
            ...state,
            isLoggedIn: action.isLoggedIn,
            message: action.payload
        }
        case DELETE_ADMIN: return {
            ...state,
            message: action.payload
        }
        case EDIT_ADMIN: return {
            ...state,
            isEdited: action.isEdited,
            message: action.payload
        }
        default: return state;
    }
}
export default adminuserReducer;