import { gameConstants } from "../constants/gameConstants";

const gameReducer = (state = {}, action) => {
    switch(action.type) {
        case gameConstants.CREATE_SUCCESS:
            return {
                gameCreated: true
            };
        case gameConstants.CREATE_FAILURE:
            return {};
        default:
            return state;
    }
};

export default gameReducer;