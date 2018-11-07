function login(username, password) {
    
    const url = "api/auth/login";
    const payload = {username: username, password: password};

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(url, options);  
}

export const userService = {
    login
}