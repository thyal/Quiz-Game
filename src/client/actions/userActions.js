import { userConstants } from "../constants/userConstants";
import { userService } from "../services/userService";

function login(username, password) {
    return async (dispatch) => {
        let response;
        let user;
        try {
            response = await userService.login(username, password);
            user = await response.json();
        } catch(error) {
            dispatch(failure(error));
        }
        if(response.status ===  401) {
            dispatch(failure("Wrong credentials"));
        }
        dispatch(success(user));     
    };

    //function request(username) { return {type: userConstants.LOGIN_REQUEST, username}}
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}}
}

function logout() {

    return async (dispatch) => {
        let response;
        try {
            response = await userService.logout();
        } catch(error) {
            dispatch(failure());
        }
        if(response.status === 204) {
            dispatch(success());
        }
    };

    function success() { return {type: userConstants.LOGOUT_SUCCESS}}
    function failure() { return {type: userConstants.LOGOUT_FAILURE}}
}


export const userActions = {
    login,
    logout
}