import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Book, { BookInterface } from '../models/Book';

export const getBooks = (_req: Request, res: Response): void => {
  Book.find((err: Error, books: BookInterface) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(books);
    }
  });
};

export const getBook = (req: Request, res: Response): void => {
  Book.findById(req.params.id, (err: Error, book: BookInterface) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(book);
    }
  });
};

export const addBook = (req: Request, res: Response): void => {
  const book = new Book(req.body);
  book.save((err: Error) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(book);
    }
  });
};

export const updateBook = (req: Request, res: Response): void => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: Error, book: BookInterface) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(book);
      }
    },
  );
};

export const deleteBook = (req: Request, res: Response): void => {
  Book.deleteOne({ _id: req.params.id }, (err: Error) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Book deleted from database');
    }
  });
};
