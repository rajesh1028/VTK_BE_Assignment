"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const book_model_1 = require("../models/book.model");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
// POST /books
bookRouter.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const { title, author } = req.body;
    const creatorID = user.userID;
    if (user.roles.includes('CREATOR')) {
        const book = new book_model_1.BookModel({ title, author, creatorID });
        yield book.save();
        res.status(201).json({ message: 'Book created successfully' });
    }
    else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}));
// GET /books
bookRouter.get('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Check the roles of the user
    if (!user.roles.includes('VIEWER') && !user.roles.includes('VIEW_ALL')) {
        res.status(403).send('You are not authorized to view books');
        return;
    }
    let books = [];
    // Implement logic to fetch books based on user role and query parameters
    if (user.roles.includes('VIEW_ALL')) {
        books = yield book_model_1.BookModel.find();
    }
    else if (user.roles.includes('VIEWER')) {
        books = yield book_model_1.BookModel.find({ creatorID: user.userID });
    }
    // Filter the books
    const date = new Date;
    if (req.query.old) {
        books = books.filter((book) => date.getTime() - book.createdAt.getTime() >= 600000);
    }
    else if (req.query.new) {
        books = books.filter((book) => date.getTime() - book.createdAt.getTime() < 600000);
    }
    // Send the books
    res.status(200).json({ books });
}));
