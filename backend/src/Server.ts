import 'module-alias/register';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import App from './App';

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
