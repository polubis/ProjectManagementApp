import WebSocketServer from 'websocket/lib/WebSocketServer';
import { request } from 'websocket';

function originIsAllowed(origin: string) {
  console.log(origin);
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

export default (wsConnection: typeof WebSocketServer): void => {
  wsConnection.on('request', function (request: request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(
        new Date() + ' Connection from origin ' + request.origin + ' rejected.',
      );
      return;
    }
  });
};
