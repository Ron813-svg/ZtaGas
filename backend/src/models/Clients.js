
import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
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
    telephone: { 
        type: String, 
        required: true
    },
    dui: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("clients", clientsSchema);