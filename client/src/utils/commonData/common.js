const getToken = () => {
    const token = localStorage.getItem('tok');
    return token;
}

export {getToken};