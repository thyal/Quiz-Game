import { gameConstants } from "../constants/gameConstants";

const gameReducer = (state = {}, action) => {
    switch(action.type) {
        case gameConstants.CREATE_SUCCESS:
            return {
                inGame: true,
                userCreatedGame: true,
                gameId: action.gameId,
                waitingForPlayers: true
            };
        case gameConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case gameConstants.JOIN_SUCCESS:
            return {
                inGame: true,
                userCreatedGame: false,
                gameId: action.gameId,
                waitingForPlayers: true
            };
        case gameConstants.JOIN_FAILURE: 
            return {
                error: action.error
            };
        case gameConstants.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            };
        case gameConstants.GET_USERS_FAILURE:
            return {
                ...state
            };
        case gameConstants.CREATE_RANDOM_GAME_SUCCESS:
            return {
                randomplayers: true
            }
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