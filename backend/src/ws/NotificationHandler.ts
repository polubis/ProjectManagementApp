import WebSocketServer from 'websocket/lib/WebSocketServer';
import { ValidateRequest } from '.';
import { request } from 'websocket';

export default (wsConnection: typeof WebSocketServer): void => {
  wsConnection.on('request', function (request: request) {
    ValidateRequest(request);
    console.log(request);
    //TODO: change request protocool
    const connection = request.accept(null, request.origin);
    console.log(new Date() + ' Connection accepted.');
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        console.log('Received Message: ' + message.utf8Data);
        const res = {
          id: 1,
          message: 'msg',
          arr: [1, 2],
        };
        connection.sendUTF(JSON.stringify(res));
      }
    });
  });
};
