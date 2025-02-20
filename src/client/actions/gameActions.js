import { gameConstants } from "../constants/gameConstants";
import { gameService } from "../services/gameService";

function createGame(name, numberOfQuestions, randomplayers, history) {
    return async (dispatch) => {
        
        if(randomplayers === undefined) { randomplayers = 0; }
        
        let response = await gameService.createGame(name, numberOfQuestions, randomplayers);
        let gameId = await response.json();

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

function getRandomPlayersGame(history) {
    return async (dispatch) => {

        let response = await gameService.getActiveRandomGame();
        let game = await response.json();

        if(response.status === 401) {
            const error = "You are not logged in";
            dispatch(failure(error));
        } else if(response.status === 200) {
            
            if(game) {
                dispatch(joinGame(game.id, history));
            } else {
                dispatch(success());
                history.push(`/createGame`);
            }
        }
    }
    function success() { return {type: gameConstants.CREATE_RANDOM_GAME_SUCCESS}}
}

function joinGame(gameId, history) {
    return async (dispatch) => {

        let response = await gameService.isGameJoinable(gameId);
        let gameIsJoinable = await response.json();

        if(gameIsJoinable) {
           dispatch(success(gameId));
           history.push(`/game/${gameId}`);
        } else {
            dispatch(failure("Game could not be joined."));
        }
    }
    function success(gameId) { return {type: gameConstants.JOIN_SUCCESS, gameId}}
    function failure(error) { return {type: gameConstants.JOIN_FAILURE, error}}
}

function getActiveGames() {
    return async (dispatch) => {

        let response = await gameService.getActiveGames();
        let games = await response.json();

        if(response.status === 401) {
            const error = "You are not logged in";
            dispatch(failure(error));
        } else if(response.status === 200) {
            dispatch(success(games));
        }
    }
    function success(games) { return {type: gameConstants.GET_ACTIVE_SUCCESS, games}}
    function failure(error) { return {type: gameConstants.GET_ACTIVE_FAILURE, error}}
}

export const gameActions = {
    createGame,
    joinGame,
    getRandomPlayersGame,
    getActiveGames
}