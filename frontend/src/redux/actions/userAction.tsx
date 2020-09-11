import { ADD_USER,USER_DATA } from './userType'
import jwt from 'jsonwebtoken'
import Api from '../../components/API';
export const addUser = (firstname: any, lastname: any, email: any) => {
    return function (dispatch: any) {
        let token: any = sessionStorage.getItem('token');
        const data: any = jwt.decode(token)
        Api.post('/users/create', {
            firstName: firstname,
            lastName: lastname,
            email: email
        }, {
            headers: { 'authorization': token }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch({
                        type: ADD_USER,
                        payload: response.data.successResponse,
                        usercreated: true
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
                        type: ADD_USER,
                        payload: error,
                        usercreated: false
                    })
                }
            });
    }
}
export const userdata = () => {
    return function (dispatch: any) {
        let token: any = sessionStorage.getItem('token');
        Api.get('/users/userlist', {
            headers: { 'authorization': token }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch({
                        type: USER_DATA,
                        payload: response.data.successResponse
                    })
                }
            }).catch(err => {
                if (err.response) {
                    console.log(err.response);
                }
            });
    }
}
export const logoutUser = () => {
    return function (dispatch: any) {
        sessionStorage.clear();
        window.location.href = "/login"
    }
}