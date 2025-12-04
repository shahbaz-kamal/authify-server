"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, { _id: false, versionKey: false });
const userSchema = new mongoose_1.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null, unique: true },
    password: { type: String, default: null },
    role: {
        type: String,
        required: true,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
    },
    phone: { type: String, default: null },
    profilePicture: { type: String, default: null },
    location: { type: String, default: null },
    auths: { type: [authProviderSchema], required: true },
    bio: { type: String, default: null },
}, { timestamps: true, versionKey: false });
exports.User = (0, mongoose_1.model)("User", userSchema);
