import express from 'express';
import { notificationsService } from '@services';

const NotificationsController = express.Router();

NotificationsController.post('', notificationsService.notifyUsers);
NotificationsController.post('/all', notificationsService.notifyAll);

export { NotificationsController };
