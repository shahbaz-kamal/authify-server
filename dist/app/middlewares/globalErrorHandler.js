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
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicateError_1 = require("../../helpers/handleDuplicateError");
const handleZodError_1 = require("../../helpers/handleZodError");
const globalErrorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (env_1.envVars.NODE_ENV === "development") {
        console.log("From error===>", error);
    }
    // if(req.file) {
    //   await deleteFromCloudinary(req.file.path)
    // }
    let statusCode = 500;
    let message = `Something went Wrong!!`;
    let errorSource = [];
    //duplicate error
    if (error.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    //zod error
    else if (error.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    //cast error
    else {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error: env_1.envVars.NODE_ENV === "development" ? error : null,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null,
    });
});
exports.globalErrorHandler = globalErrorHandler;
