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
exports.userRouter = void 0;
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find();
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}));
userRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, roles } = req.body;
    try {
        bcrypt_1.default.hash(password, 5, (err, secure_pwd) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                const user = new user_model_1.UserModel({ email, password: secure_pwd, roles });
                yield user.save();
                res.send('User registered successfully');
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.send('Error in registering');
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.UserModel.find({ email });
        let hashed_pwd = user[0].password;
        if (user.length > 0) {
            bcrypt_1.default.compare(password, hashed_pwd, (err, result) => {
                if (result) {
                    const token = jsonwebtoken_1.default.sign({ userID: user[0]._id, roles: user[0].roles }, "varthak", { expiresIn: '2h' });
                    res.send({ msg: 'Login Successful', token });
                }
                else {
                    res.send('Wrong credentials');
                }
            });
        }
        else {
            res.send('Wrong credentials');
        }
    }
    catch (error) {
        console.log(error);
        res.send('Error in login');
    }
}));
