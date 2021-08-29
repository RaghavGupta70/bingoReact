const getToken = () => {
    const token = localStorage.getItem('tok');
    return token;
}

const getUsers = () => {
  const allUsers = sessionStorage.getItem('usersRoom')
  console.log(allUsers)  
  return allUsers;
}

const putUsers = (data) => {
    console.log(data)
    sessionStorage.setItem('usersRoom',JSON.stringify(data));
    return 1;
}

export {getToken,putUsers,getUsers};