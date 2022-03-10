const TOKEN_KEY = 'jwt';
const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'Login');
    localStorage.setItem('filter', '');
}

export const userName = () => {
    const user = (localStorage.getItem("userName"));
        return (user)
}

export const email = () => {
    const email = (localStorage.getItem("emailAddress"));
    return (email)
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userName");
    localStorage.removeItem('filter');
    fetch(`${API_ENDPOINT}/api/logout`, { credentials: 'include', method: 'POST' })
    console.log("logget out")
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export default login