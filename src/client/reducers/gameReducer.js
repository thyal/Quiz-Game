import { gameConstants } from "../constants/gameConstants";

const gameReducer = (state = {}, action) => {
    switch(action.type) {
        case gameConstants.CREATE_SUCCESS:
            return {
                inGame: true,
                gameId: action.gameId,
                waitingForPlayers: true
            };
        case gameConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case gameConstants.GET_ACTIVE_SUCCESS:
            return {
                games: action.games
            };
        case gameConstants.GET_ACTIVE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
};

export default gameReducer;