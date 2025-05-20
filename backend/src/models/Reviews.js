import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    Comment:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    idClient:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "clients"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("reviews", reviewSchema);