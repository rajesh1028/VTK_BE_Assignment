"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;
    // Verify and decode the token
    jsonwebtoken_1.default.verify(token, "varthak", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Attach the decoded token to the request object
        const user = decoded;
        req.body.user = user;
        next();
    });
};
exports.authMiddleware = authMiddleware;
