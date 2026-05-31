"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.ok = void 0;
const ok = (res, data, message = "OK", status = 200, meta) => {
    const response = {
        success: true,
        message,
        data,
        ...(meta && { meta })
    };
    return res.status(status).json(response);
};
exports.ok = ok;
const fail = (res, message = "Error", status = 400, error) => {
    return res.status(status).json({
        success: false,
        message,
        ...(error && { error })
    });
};
exports.fail = fail;
