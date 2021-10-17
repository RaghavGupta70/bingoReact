import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameModel = new Schema({
    roomID: String,
    userName: String,
    userEmail: String,
    numbers: [{
        value: Number,
        userName: String,
    }]
})

const game = mongoose.model('game',gameModel);

export default game;