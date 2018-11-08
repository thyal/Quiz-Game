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

export const gameService = {
    createGame
}