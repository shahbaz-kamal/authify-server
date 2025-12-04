"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    const message = `${matchedArray[0]} already exists`;
    return {
        statusCode: 400,
        message,
    };
};
exports.handleDuplicateError = handleDuplicateError;
