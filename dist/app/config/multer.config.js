"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
const multer_1 = __importDefault(require("multer"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.cloudinaryUpload,
    params: (req, file) => {
        const parts = file.originalname.split(".");
        parts.pop(); // remove last extension
        const originalName = parts.join("."); // keep rest even if contains dots
        const fileName = originalName
            .toLowerCase()
            .replace(/\s+/g, "-") //replace empty space with -
            .replace(/\./g, "-") //replace . with dash
            // eslint-disable-next-line no-useless-escape
            .replace(/[^a-z0-9\-\.]/g, ""); //removes non alphanumeric value
        const uniqueFileName = Math.random().toString(36).substring(2) +
            "-" +
            Date.now() +
            "-" +
            fileName;
        return {
            public_id: uniqueFileName, // 👈 this sets the file name
            resource_type: "auto",
            // keeps extension
        };
    },
});
exports.multerUpload = (0, multer_1.default)({ storage: storage });
