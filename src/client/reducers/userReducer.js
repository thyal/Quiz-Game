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
        
        case userConstants.LOGOUT_SUCCESS:
            return {};
        case "CLEAR_ALERTS":
            return {};
        default:
            return state;
    }
};

export default userReducer;