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

    const users = { name: userName,roomId: id};
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
     const roomNo ={roomId: Id,userName: userName}
      console.log(validRoom);
      arr.push(roomNo)
      return {roomNo};
}