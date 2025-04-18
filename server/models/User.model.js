import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ["startup", "investor"],
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
