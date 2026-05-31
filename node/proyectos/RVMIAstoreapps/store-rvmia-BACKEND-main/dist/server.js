"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const startServer = async () => {
    try {
        console.log("ENV Mongo:", env_1.env.mongoUri ? "OK" : "VACÍO");
        await (0, db_1.connectDB)();
        app_1.default.listen(env_1.env.port, () => {
            console.log(`SV1. Servidor en puerto ${env_1.env.port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
startServer();
