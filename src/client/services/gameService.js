function createGame(name, numberOfQuestions, randomplayers) {
    const url = "api/game/create";
    const payload = {name: name, numberOfQuestions: numberOfQuestions, randomplayers: randomplayers};

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(url, options);  
}

function isGameJoinable(gameId) {
    const url = `/api/game/isGameJoinable/${gameId}`;

    return fetch(url);
}

function getUsersInGame(gameId) {
    const url = `/api/game/usersInGame/${gameId}`;

    return fetch(url);
}

function getActiveGames() {
    const url = "api/game/active";
    
    return fetch(url);
}

function getActiveRandomGame() {
    const url = "api/game/activeRandom";
    
    return fetch(url);
}

export const gameService = {
    createGame,
    isGameJoinable,
    getUsersInGame,
    getActiveGames,
    getActiveRandomGame
}