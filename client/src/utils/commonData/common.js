const getToken = () => {
    const token = localStorage.getItem('tok');
    return token;
}

const getUsers = () => {
  const allUsers = JSON.parse(sessionStorage.getItem('usersRoom'));
  return allUsers;
}

const putUsers = (data) => {
    sessionStorage.setItem('usersRoom',JSON.stringify(data));
    return 1;
}

const getUserName = () => {
  return JSON.parse(localStorage.getItem('user')).result.userName;
}

const getPlayValue = () => {
  return sessionStorage.getItem('playValue');
}
export {getToken,putUsers,getUsers,getUserName,getPlayValue};