export interface SignUpState {
    [x: number]: any;
    message: string;
    firstname: string;
    lastname: string;
    email: string;
    password: any;
    isRegisterd: any
}
export interface LoginState {
    [x: number]: any;
    message: string;
    email: string;
    password: any;
    isLoggedIn: any
}
export interface EditFormState {
    [x: number]: any;
    message: string;
    firstname: string;
    lastname: string;
    email: string;
    isEdited: any
}