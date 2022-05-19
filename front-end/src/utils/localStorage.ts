export const getTokenAccess = () => {
    return JSON.parse(localStorage.getItem('token') || 'null');
};

export const deleteToken = () => {
    return localStorage.removeItem('token');
};

export const setTokenAccess = (value: string) => {
    return localStorage.setItem('token', value);
};