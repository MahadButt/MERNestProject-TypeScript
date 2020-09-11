import { SIGNUP_ADMIN, LOGIN_ADMIN, DELETE_ADMIN, EDIT_ADMIN } from './adminType'
import jwt from 'jsonwebtoken'
import Api from '../../components/API';
export const signUpAdmin = (firstname: any, lastname: any, email: any, password: any) => {
    return function (dispatch: any) {
        Api.post('/admin/signup', {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch({
                        type: SIGNUP_ADMIN,
                        payload: response.data.successResponse,
                        isRegisterd: true
                    })
                }
            }).catch(err => {
                let error;
                if (typeof (err.response.data.message) === "string") {
                    error = err.response.data.message;
                } else if (typeof (err.response.data.message) === "object") {
                    error = err.response.data.message[0];
                }
                if (err.response) {
                    dispatch({
                        type: SIGNUP_ADMIN,
                        payload: error,
                        isRegisterd: false
                    })
                }
            });
    }
}
export const loginAdmin = (email: any, password: any) => {
    return function (dispatch: any) {
        Api.post('/admin/login', {
            email: email,
            password: password
        })
            .then((response) => {
                if (response.data.success) {
                    let token = response.data.successResponse.accessToken;
                    sessionStorage.setItem('token', token)
                    window.location.href = "/";
                }
            }).catch(err => {
                let error;
                if (typeof (err.response.data.message) === "string") {
                    error = err.response.data.message;
                } else if (typeof (err.response.data.message) === "object") {
                    error = err.response.data.message[0];
                }
                if (err.response) {
                    dispatch({
                        type: LOGIN_ADMIN,
                        payload: error,
                        isLoggedIn: false
                    })
                }
            });
    }
}
export const deleteAdmin = () => {
    return function (dispatch: any) {
        let token: any = sessionStorage.getItem('token');
        const data: any = jwt.decode(token)
        Api.delete(`/admin/${data.admin.id}/delete`, {
            headers: { 'authorization': token }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(logoutAdmin())
                }
            }).catch(err => {
                let error: any = err.response.data.message;
                if (err.response) {
                    dispatch({
                        type: DELETE_ADMIN,
                        payload: error
                    })
                }
            });
    }
}
export const logoutAdmin = () => {
    return function (dispatch: any) {
        sessionStorage.clear();
        window.location.href = "/login"
    }
}
export const editAdmin = (firstname: any, lastname: any, email: any) => {
    return function (dispatch: any) {
        let token: any = sessionStorage.getItem('token');
        Api.put(`/admin/update`, {
            firstName: firstname,
            lastName: lastname,
            email: email
        }, {
            headers: { 'authorization': token }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch({
                        type: EDIT_ADMIN,
                        payload: response.data.successResponse,
                        isEdited: true
                    })
                }
            }).catch(err => {
                let error;
                if (typeof (err.response.data.message) === "string") {
                    error = err.response.data.message;
                } else if (typeof (err.response.data.message) === "object") {
                    error = err.response.data.message[0];
                }
                if (err.response) {
                    dispatch({
                        type: EDIT_ADMIN,
                        payload: error,
                        isEdited: false
                    })
                }
            });
    }
}
