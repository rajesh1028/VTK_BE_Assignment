import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  creatorID: string;
  createdAt: Date;
}

const bookSchema: Schema<Book> = new mongoose.Schema<Book>(
  {
    title: String,
    author: String,
    creatorID: String
  },
  { timestamps: { createdAt: true } }
);

const BookModel: Model<Book> = mongoose.model<Book>('book', bookSchema);

export { BookModel };