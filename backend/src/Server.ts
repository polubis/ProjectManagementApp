import 'reflect-metadata';
import dotenv from 'dotenv';
import App from './App';

dotenv.config();

process.on('uncaughtException', (err: Error) => {
  console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    --------------------
    `);
});

module.exports = App.server;
