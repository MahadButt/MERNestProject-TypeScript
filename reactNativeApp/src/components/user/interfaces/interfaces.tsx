export interface SignUpState {
    firstname: string;
    lastname: string;
    email: string;
    password: any;
    isRegisterd: any
}
export interface LoginState {
    email: string;
    password: any;
    isLoggedIn: any
}
export interface EditFormState {
    firstName: string;
    lastName: string;
    email: string;
}