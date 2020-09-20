# node-js-typescript-onion-boilerplate

Clean and minimalistic Node.js boilerplate w/ TS implementing ONION architecture.

All basic tools included and configured:

- [TypeScript][typescript] [4.0][typescript-4-0]
- [ESLint][eslint] with some initial rules
- [Jest][jest] for unit testing and code coverage
- Type definitions for Jest and Node.js as well as its dependencies
- [Prettier][prettier] to enforce consistent code style

Server setup:

- [Express][express] server with test REST endpoints `/api/books`
- [MongoDB][mongodb] connection established using [Mongoose][mongoose] ODM
- [Websockets][websocket-node] connection established on server side (WITHOUT rules for verifying the connection's origin)

## Available Scripts

- `build` - transpile TypeScript to ES6 & run server
- `build-watch` - interactive watch mode to automatically transpile source files,
- `clean` - remove coverage data, Jest cache and transpiled files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test-coverage` - run tests & collect test coverage information and report it in the output
- `test-watch` - interactive watch mode to automatically re-run tests
- `test-watch-silent` - interactive watch mode to automatically re-run tests & prevent printing messages through console

[typescript]: https://www.typescriptlang.org/
[typescript-4-0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
[express]: https://expressjs.com/
[mongodb]: https://www.mongodb.com/
[mongoose]: https://mongoosejs.com/
[websocket-node]: https://github.com/theturtle32/WebSocket-Node
