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
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../utils/jwt");
const checkAuth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken)
            throw new AppError_1.default(401, "No Token Received");
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
        if (!verifiedToken)
            throw new AppError_1.default(401, "Token is not verified");
        const userId = verifiedToken.userId;
        const isUSerExist = yield user_model_1.User.findById(userId);
        if (!isUSerExist)
            throw new AppError_1.default(401, "User dosent exist");
        // const frontendUserId = req.params.id;
        // if (frontendUserId !== (verifiedToken as JwtPayload).userId)
        //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted to do this action");
        const isCredentialAuthenticated = isUSerExist.auths[0].provider === "credentials";
        if (isCredentialAuthenticated) {
            if (verifiedToken.email !== isUSerExist.email) {
                throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not permitted to do this action");
            }
        }
        else {
            if (verifiedToken.phone !== isUSerExist.phone) {
                throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not permitted to do this route");
            }
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
