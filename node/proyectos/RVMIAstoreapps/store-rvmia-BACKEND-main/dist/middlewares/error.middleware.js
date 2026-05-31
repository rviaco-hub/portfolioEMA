"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, _, res, __) => {
    console.log("SV1.1", err);
    res.status(500).json({ error: err.message });
};
exports.errorMiddleware = errorMiddleware;
