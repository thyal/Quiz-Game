import { gameConstants } from "../constants/gameConstants";
import { gameService } from "../services/gameService";

function createGame(name, numberOfQuestions, history) {
    return async (dispatch) => {
        let response;
        let gameId;
        try {
            response = await gameService.createGame(name, numberOfQuestions);
            gameId = await response.json();
        } catch(error) {
            //dispatch(failure(error));
        }
        if(response.status ===  401) {
            const error = "You are not logged in";
            dispatch(failure(error));
        } else if(response.status === 201) {
            dispatch(success(gameId));
            history.push(`/game/${gameId}`);
        }         
    };
    function success(gameId) { return {type: gameConstants.CREATE_SUCCESS, gameId}}
    function failure(error) { return {type: gameConstants.CREATE_FAILURE, error}}
}

export const gameActions = {
    createGame
}