import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection: Promise<Mongoose> = mongoose.connect("mongodb+srv://Rajesh:rajesh@cluster0.odfmnjk.mongodb.net/varthak?retryWrites=true&w=majority");

export { connection };