import { userConstants } from "../constants/userConstants";
import { userService } from "../services/userService";

function login(username, password) {
    return async (dispatch) => {
        try {
            let user = await userService.login(username, password);
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