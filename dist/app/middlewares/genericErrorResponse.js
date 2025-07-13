"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericErrorResponse = (err, req, res, next) => {
    let statusCode = 500;
    let message = "something went wrong";
    const error = err;
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
    }
    res.status(statusCode).json({
        message,
        success: false,
        error
    });
    next();
};
exports.default = genericErrorResponse;
