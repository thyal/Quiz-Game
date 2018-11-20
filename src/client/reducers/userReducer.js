import { userConstants } from "../constants/userConstants";

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            };
        case userConstants.SIGNUP_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.SIGNUP_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            };
        case userConstants.GET_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.GET_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            };
        case userConstants.GET_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.token
            };
        case userConstants.GET_TOKEN_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case userConstants.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
};

export default userReducer;