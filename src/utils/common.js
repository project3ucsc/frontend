
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
