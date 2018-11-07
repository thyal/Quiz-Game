import { userConstants } from "../constants/userConstants";
import { userService } from "../services/userService";

async function login(username, password) {
    return dispatch => {
        let user;
        try {
            let response = await userService.login(username, password);
            user = await response.json();

            dispatch(success(user));
        } catch(error) {
            dispatch(failure(error));
        }
    };

    function request(username) { return {type: userConstants.LOGIN_REQUEST, username}}
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}}
}

export const userActions = {
    login
}