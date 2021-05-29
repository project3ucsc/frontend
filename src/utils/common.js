
export const getSessionData = () => {
    const data = localStorage.getItem('user')
    if(data) return JSON.parse(data)
    else return null
}

export const setSessionData = (user) => {
    const data = JSON.stringify(user)
    localStorage.setItem('user',data)
}

export const removeSessionData = () => {
    localStorage.removeItem('user')
}

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
