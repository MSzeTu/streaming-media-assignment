const http = require('http');
const htmlHandler = require('./htmlResponse');
const mediaHandler = require('./mediaResponse');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/page2':
      htmlHandler.getClient2(request, response);
      break;
    case '/page3':
      htmlHandler.getClient3(request, response);
      break;
    case '/party.mp4':
      mediaHandler.getFile(request, response, '../client/party.mp4');
      break;
    case '/bird.mp4':
      mediaHandler.getFile(request, response, '../client/bird.mp4');
      break;
    case '/bling.mp3':
      mediaHandler.getFile(request, response, '../client/bling.mp3');
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
