import Rooms from '../models/room.js';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const createRoom = (userName) => {
    var id = randomString(11, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const existingRoom = Rooms.findOne({ roomId: id });
    console.log(existingRoom);
    if (existingRoom.roomId) return { error: 'Try again! You have some connectivity issue LOL:)' };

    const users = [{ name: userName }];
    const newRoom = new Rooms({ roomId: id, users });
    newRoom.save();
    return { newRoom };
}

export const joinRoom = async(Id, userName) => {
    if (!Id) return { error: 'Enter Room Id!' };

    var validRoom = await Rooms.findOne({ roomId: Id }, async(err, roomNo) => {
        if (err) return console.log(err);
        else {
            if (!roomNo) return { error: 'Given Room Id doesn\'t exists',roomNo:{roomId:null} };
            const object = { name: userName }

            console.log('Hello');
            await Rooms.update({ roomId: roomNo._id }, { $push: { users: object } });
        }
    }).exec();
    console.log(validRoom);
    return {error:'',roomNo:{roomId:Id}};
    // var c=0;

    // for(var i=0;i<validRoom.users.length;i++){
    //    if(rooms.roomId === validRoom.roomId)
    //     c++;
    // }

    // if(c === 4)
    //  return {error:'Room is already full'};
}