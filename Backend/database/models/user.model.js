import { Schema, model , mongoose} from "mongoose";
import { SystemRoles } from "../../src/utils/index.js";


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: Object.values(SystemRoles),
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{
    timestamps : true,
});

export const User = mongoose.models.userModel || mongoose.model("User", userSchema);


export default User;