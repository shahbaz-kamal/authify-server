"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string("Name is required")
        .min(2, "Name should be at least minimum of two characters")
        .max(50, "Name should be maximum of 50 characters"),
    email: zod_1.default
        .email("Invalid Email Format")
        .min(2, "Email should be at least minimum of two characters")
        .max(50, "Email should be maximum of 50 characters")
        .optional(),
    password: zod_1.default
        .string("Password Must be string")
        .min(6, "Password must includes at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .optional(),
    phone: zod_1.default
        .string("Phone number must be a string")
        .regex(/^(\+8801[3-9][0-9]{8}|01[3-9][0-9]{8})$/, "Invalid Bangladeshi phone number format")
        .optional(),
    bio: zod_1.default
        .string("Name is required")
        .min(2, "Name should be at least minimum of two characters")
        .max(50, "Name should be maximum of 50 characters")
        .optional(),
    profilePhoto: zod_1.default.string("Photo must be string").optional(),
    locaation: zod_1.default
        .string("Address must be string")
        .max(200, {
        message: "Address can not exceed more than 200 characters",
    })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string("Name is required")
        .min(2, "Name should be at least minimum of two characters")
        .max(50, "Name should be maximum of 50 characters"),
    bio: zod_1.default
        .string("Bio is String")
        .min(2, "Bio should be at least minimum of two characters")
        .max(50, "Name should be maximum of 50 characters")
        .optional(),
    profilePhoto: zod_1.default.string("Photo must be string").optional(),
    location: zod_1.default
        .string("Address must be string")
        .max(200, {
        message: "Address can not exceed more than 200 characters",
    })
        .optional(),
});
