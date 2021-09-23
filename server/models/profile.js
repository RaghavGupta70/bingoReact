import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique:true
    },
    matchesPlayed: {
        type:Number,
        default:0
    },
    matchesWon: {
        type: Number,
        default: 0
    },
    matchesLost:{
        type:Number,
        default:0
    }
});

const profile = mongoose.model('profile',profileSchema);

export default profile;