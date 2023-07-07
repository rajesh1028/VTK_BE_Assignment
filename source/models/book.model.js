"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    creatorID: String
}, { timestamps: { createdAt: true } });
const BookModel = mongoose_1.default.model('book', bookSchema);
exports.BookModel = BookModel;
