"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    try {
        console.log("Conectando Atlas...");
        console.log("URI cargada:", !!env_1.env.mongoUri);
        await mongoose_1.default.connect(env_1.env.mongoUri);
        console.log("MongoDB Atlas conectado");
    }
    catch (error) {
        console.error("Error MongoDB:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
