
function login(username, password) {
    
    const url = "api/auth/login";
    const payload = {username: username, password: password};

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(url, options).then(getUser);  
}

function getUser() {
    const url = "api/auth/user";

    return fetch(url);
}

function logout() {
    const url = "api/auth/logout";
    
    return fetch(url, {method: 'POST'});
}

export const userService = {
    login,
    getUser,
    logout
}