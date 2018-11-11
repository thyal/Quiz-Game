import { userConstants } from "../constants/userConstants";
import { userService } from "../services/userService";

function login(username, password, history) {
    return async (dispatch) => {

        let response = await userService.login(username, password);

        if(response.status ===  401) {
            const error = "Wrong credentials";
            dispatch(failure(error));
        } else {
            let user = await response.json();
            dispatch(success(user));
            history.push("/");
        }         
    };
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}}
}

function signup(username, password, history) {
    return async (dispatch) => {

        let response = await userService.signup(username, password);

        if(response.status === 409) {
            const error = "The username already exsist. Please select another one.";
            dispatch(failure(error));
        } else if(response.status === 204) {
            let userResponse = await userService.getUser();
            let user = await userResponse.json();
            dispatch(success(user));
            history.push("/");
        }
    };

    function success(user) { return {type: userConstants.SIGNUP_SUCCESS, user}}
    function failure(error) { return {type: userConstants.SIGNUP_FAILURE, error}}
}

function getToken() {
    return async (dispatch) => {
        let response;
        let error;
        try {
            response = await userService.getToken();
        } catch(err) {
            error = "Something went wrong";
            dispatch(failure(error));
        }
        if(response.status === 401) {
            error = "You are not logged in";
            dispatch(failure(error));
        }
        if(response.status === 201) {
            const token = await response.json();
            dispatch(success(token));
        }

        
    }
    function success(token) { return {type: userConstants.GET_TOKEN_SUCCESS, token}}
    function failure(error) { return {type: userConstants.GET_TOKEN_FAILURE, error}}
}

function logout() {

    return async (dispatch) => {

        let response = await userService.logout();

        if(response.status === 204) {
            dispatch(success());
        } else {
            dispatch(failure());
        }
    };

    function success() { return {type: userConstants.LOGOUT_SUCCESS}}
    function failure() { return {type: userConstants.LOGOUT_FAILURE}}
}


export const userActions = {
    login,
    signup,
    getToken,
    logout
}