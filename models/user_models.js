import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("users", userSchema);
