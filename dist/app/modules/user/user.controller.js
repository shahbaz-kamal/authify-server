"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const setAuthCookie_1 = require("../../utils/setAuthCookie");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = yield user_service_1.UserService.createUser(payload);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "User Created Successfully",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const credentialLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = yield user_service_1.UserService.credentialsLogin(payload);
        const jwtPayload = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
        const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
        (0, setAuthCookie_1.setAuthCookie)(res, { accessToken, refreshToken });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Login successfull",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const payload = req.body;
        const userId = req.params.id;
        const verifiedToken = req.user;
        const payload = Object.assign(Object.assign({}, req.body), { profilePicture: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
        console.log(payload);
        const result = yield user_service_1.UserService.updateUser(userId, payload, verifiedToken);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "User Created Successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const payload = req.body;
        const decodedToken = req.user;
        const result = yield user_service_1.UserService.getMe(decodedToken.userId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Your Data Retrieved Successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const payload = req.body;
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        console.log("Log out");
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "logged out",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const loginWithPhoneNumber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = yield user_service_1.UserService.loginWithPhoneNumber(payload, res);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Login successfull",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.UserController = { createUser, credentialLogin, updateUser, getMe, logout, loginWithPhoneNumber };
