const TOKEN_KEY = 'jwt';

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'Login');
}

export const userName = () => {
    const user = (localStorage.getItem("userName"));
        return (user)
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userName");
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export default login