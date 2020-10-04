import { request } from 'websocket';

function originIsAllowed(origin: string) {
  console.log(origin);
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

export default (request: request): void => {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + ' Connection from origin ' + request.origin + ' rejected.',
    );
    return;
  }
};
