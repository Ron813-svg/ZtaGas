
import { Schema, model } from "mongoose";

const brachesSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        schedule: [
            {
                type: Schema.Types.ObjectId,
                ref: "products"
            }
        ]
}, {
        timestamps: true,
        strict: false
})

export default model("branches", brachesSchema);