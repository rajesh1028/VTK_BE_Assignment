import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { BookModel, Book } from '../models/book.model';

const bookRouter: Router = Router();

// POST /books
bookRouter.post('/', authMiddleware, async (req: Request, res: Response) => {
    const { user } = req.body;
    const { title, author } = req.body;
    const creatorID: string = user.userID;

    if (user.roles.includes('CREATOR')) {
        const book: Book = new BookModel({ title, author, creatorID });
        await book.save();
        res.status(201).json({ message: 'Book created successfully' });
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
});

// GET /books
bookRouter.get('/', authMiddleware, async (req: Request, res: Response) => {
    const { user } = req.body;

    // Check the roles of the user
    if (!user.roles.includes('VIEWER') && !user.roles.includes('VIEW_ALL')) {
        res.status(403).send('You are not authorized to view books');
        return;
    }

    let books: Book[] = [];

    // Implement logic to fetch books based on user role and query parameters
    if (user.roles.includes('VIEW_ALL')) {
        books = await BookModel.find();
    } else if (user.roles.includes('VIEWER')) {
        books = await BookModel.find({ creatorID: user.userID });
    }

    // Filter the books
    const date = new Date;
    if (req.query.old) {
        books = books.filter((book: Book) => date.getTime() - book.createdAt.getTime() >= 600000);
    } else if (req.query.new) {
        books = books.filter((book: Book) => date.getTime() - book.createdAt.getTime() < 600000);
    }

    // Send the books
    res.status(200).json({ books });
});

export { bookRouter };