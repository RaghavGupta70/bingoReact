import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    roomId:{
        type:String,
        unique:true
    },
    users:[{name:String}]
});

const rooms = mongoose.model('rooms',roomSchema);

export default rooms;