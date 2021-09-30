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
    },
    profileImage:String,
    status:String,
    registeredDate:Date,
    opponents:[{
        value: Number,
        label: String        
    }],
    opponentsData:[
        {
        value: Number,
        opponentEmail:String,
        matchPlayed:Number,
        matchWon:Number,
        matchLost:Number,
        }
    ],
    rating:{
        type:Number,
        default:10
    },
    matches:[{
        matchMonth:String,
        matchesWon: Number,
        matchesLost: Number,
        matchesNoResult: Number,
    }]
});

const profile = mongoose.model('profile',profileSchema);

export default profile;