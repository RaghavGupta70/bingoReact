import Rooms from '../models/room.js';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const createRoom = (userName) => {
    var roomId = randomString(11, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const existingRoom = Rooms.findOne({roomId});
    if(existingRoom) return {error:'Try again! You have some connectivity issue LOL:)'};
    
    const newRoom = {roomId,userName};
    newRoom.save();
    return { newRoom };
}

export const joinRoom = (roomId,userName) => {
    if(!roomId) return {error: 'Enter Room Id!'};

    const validRoom = Rooms.findOne({roomId});
    if(!validRoom) return {error: 'Given Room Id doesn\'t exists'};
    // var c=0;

    // for(var i=0;i<validRoom.users.length;i++){
    //    if(rooms.roomId === validRoom.roomId)
    //     c++;
    // }

    // if(c === 4)
    //  return {error:'Room is already full'};

    Rooms.findByIdAndUpdate(validRoom._id,{users:[...{name:userName}]});
    return { newRoom };
}