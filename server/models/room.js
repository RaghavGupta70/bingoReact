import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    roomId:{
        type:String,
        unique:true
    },
    users:[{name:String}]
});

const Rooms = mongoose.model('Rooms',roomSchema);

export default Rooms;