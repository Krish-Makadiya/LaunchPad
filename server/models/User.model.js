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
    socialLinks: {
        linkedin: {
            type: String,
            default: "https://www.youtube.com"
        },
        twitter: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        }
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
