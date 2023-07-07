import express, { Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { connection } from './configs/db';
import { userRouter } from './routes/user.route';
import { bookRouter } from './routes/book.route';

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Create a write stream to a log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware for logging requests to the file
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Home Page');
});

app.use('/users', userRouter);
app.use('/books', bookRouter);

// Start the server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Connected to DB');
  } catch (error) {
    console.log('Not connected to DB');
  }
  console.log(`Server is running on port ${PORT}`);
});