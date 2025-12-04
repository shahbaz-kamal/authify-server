"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSource = [];
    err.issues.forEach((errorElement) => {
        errorSource.push({
            path: errorElement.path[errorElement.path.length - 1],
            message: errorElement.message,
        });
    });
    return { message: "Zod Error", statusCode: 400, errorSource };
};
exports.handleZodError = handleZodError;
