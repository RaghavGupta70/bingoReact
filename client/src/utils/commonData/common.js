const getToken = () => {
    const token = localStorage.getItem('tok');
    return token;
}

const getType = () => {
  const type = sessionStorage.getItem('currentType');
  return type;
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

const getUserEmail = () => {
  return JSON.parse(localStorage.getItem("user")).result.email;
};

const getPlayValue = () => {
  return sessionStorage.getItem('playValue');
}
export {getToken,getType,putUsers,getUsers,getUserName,getUserEmail,getPlayValue};