
import { Schema, model } from "mongoose";

const assessmentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    role: {
        type: String,
        required: true
    }
    ,
    idEmployee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "employees"
    }

}, {
    timestamps: true,
    strict: false
 });
 
 export default model("assessments", assessmentSchema);