import Rooms from '../models/room.js';

const arr = [];

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const createRoom = (userName) => {
    var id = randomString(11, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    console.log(arr)
    const existingRoom = arr.find((item) => (item.roomId === id));
    console.log(existingRoom);
    if (existingRoom) return { error: 'Try again! You have some connectivity issue LOL:)' };

    const users = { roomId: id,userName: userName,numbers:[]};
    arr.push(users);
        console.log(arr);
    return {users};
}

export const joinRoom = async(Id, userName) => {
    if (!Id) return { error: 'Enter Room Id!' };

    var validRoom = arr.find((item) => ( item.roomId === Id))
        const err = "No room exists with this room id";
    if(!validRoom) {
        return {err}
    }
    
   
    var c=0;

    for(var i=0;i<arr.length;i++){
       if(arr[i].roomId === validRoom.roomId)
        c++;
    }

    if(c === 4)
     return {error:'Room is already full'};
     const roomNo ={roomId: Id,userName: userName,numbers:[]}
      console.log(validRoom);
      arr.push(roomNo)
      return {roomNo};
}

export const getUserInRoom = (Id) => {
     return arr.filter((user)=> user.roomId === Id);
}

export const fillNumbers = (Id,userName,num) => {
   var users = arr.filter((user)=> user.roomId === Id)
   users.map((user) => user.numbers=[...user.numbers,num]);
   return users;
}