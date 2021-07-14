import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    } 
}
)

const auth = mongoose.model('Auth',authSchema);

export default auth;