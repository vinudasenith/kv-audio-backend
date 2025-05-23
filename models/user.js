import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "customer"
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        required: true,
        default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740"
    },

    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    }

});

const User = mongoose.model("User", userSchema);
export default User;

