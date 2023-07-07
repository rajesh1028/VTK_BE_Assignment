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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./configs/db");
const user_route_1 = require("./routes/user.route");
const book_route_1 = require("./routes/book.route");
const app = (0, express_1.default)();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// Middleware for parsing JSON request bodies
app.use(express_1.default.json());
// Create a write stream to a log file
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
// Middleware for logging requests to the file
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.get('/', (req, res) => {
    res.send('Welcome to Home Page');
});
app.use('/users', user_route_1.userRouter);
app.use('/books', book_route_1.bookRouter);
// Start the server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.connection;
        console.log('Connected to DB');
    }
    catch (error) {
        console.log('Not connected to DB');
    }
    console.log(`Server is running on port ${PORT}`);
}));
