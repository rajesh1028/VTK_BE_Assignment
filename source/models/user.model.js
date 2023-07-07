"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    roles: {
        type: [String],
        enum: ['CREATOR', 'VIEWER', 'VIEW_ALL'],
        default: ['VIEWER']
    }
}, { timestamps: { createdAt: true } });
const UserModel = mongoose_1.default.model('user', userSchema);
exports.UserModel = UserModel;
