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

export default authSchema;
