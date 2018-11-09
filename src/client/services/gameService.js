function createGame(name, numberOfQuestions) {
    const url = "api/game/create";
    const payload = {name: name, numberOfQuestions: numberOfQuestions};

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(url, options);  
}

function isGameJoinable(gameId) {
    const url = "/api/game/isGameJoinable/1";

    return fetch(url);
}

function getActiveGames() {
    const url = "api/game/active";
    
    return fetch(url);
}

export const gameService = {
    createGame,
    isGameJoinable,
    getActiveGames
}