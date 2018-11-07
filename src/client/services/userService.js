
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

    return fetch(url).then(handleResponse);
}

function handleResponse(response) {
    if(response.status === 401) {
        const error = response.statusText;
        return Promise.reject(error);
    } else {
        return response.json();
    }
}

export const userService = {
    login,
    getUser
}