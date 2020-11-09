import express from 'express';
import { connectionsService } from '@services';

const ConnectionsController = express.Router();

ConnectionsController.put('/logout/:userId', connectionsService.logOut);
ConnectionsController.put('/login/:userId', connectionsService.logIn);

export { ConnectionsController };
