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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const jwt_1 = require("../../utils/jwt");
const setAuthCookie_1 = require("../../utils/setAuthCookie");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExist)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already exist");
    let authProvider;
    if (payload.email)
        authProvider = { provider: "credentials", providerId: payload.email };
    else
        authProvider = { provider: "phone", providerId: payload.phone };
    const { password } = payload, rest = __rest(payload, ["password"]);
    const hashedPassword = bcryptjs_1.default.hashSync(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const newUser = Object.assign({ password: hashedPassword, auths: [authProvider] }, rest);
    const user = yield user_model_1.User.create(newUser);
    return user;
});
const credentialsLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
    const { password } = payload, rest = __rest(payload, ["password"]);
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched)
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Password dosent match");
    return isUserExist;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    if (userId !== decodedToken.userId)
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not permitted");
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const getMe = (myId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(myId).select("-password");
    return user;
});
const loginWithPhoneNumber = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = "+" + payload.phone;
    const isUserExist = yield user_model_1.User.findOne({ phone });
    const authProvider = { provider: "phone", providerId: phone };
    let user;
    if (!isUserExist) {
        const newUser = {
            phone,
            auths: [authProvider],
        };
        user = yield user_model_1.User.create(newUser);
    }
    else {
        user = isUserExist;
    }
    const jwtPayload = {
        userId: user._id,
        phone: user.phone,
        role: user.role,
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
    (0, setAuthCookie_1.setAuthCookie)(res, { accessToken, refreshToken });
    return user;
});
exports.UserService = { createUser, credentialsLogin, updateUser, getMe, loginWithPhoneNumber };
