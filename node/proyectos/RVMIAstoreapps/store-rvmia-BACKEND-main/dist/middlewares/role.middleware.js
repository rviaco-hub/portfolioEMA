"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        console.log(`MW3,2. ${roles}`);
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
