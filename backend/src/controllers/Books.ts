import express from 'express';
import { BooksService } from '../services';

const BooksController = express.Router();

BooksController.get('', BooksService.getBooks);
BooksController.get('/:id', BooksService.getBook);
BooksController.post('', BooksService.addBook);
BooksController.patch('/:id', BooksService.updateBook);
BooksController.delete('/:id', BooksService.deleteBook);

export default BooksController;
