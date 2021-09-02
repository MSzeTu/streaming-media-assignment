const fs = require('fs'); // pulls in file system module
const path = require('path');
const mFunctions = require('./mediaFunctions');

const getFile = (request, response, fileName) => {
  const file = path.resolve(__dirname, fileName);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    const positions = mFunctions.getRange(request);

    const points = mFunctions.getPoints(positions, stats);

    mFunctions.sendChunk(points, response);

    return mFunctions.sendStream(file, points, response);
  });
};

module.exports.getFile = getFile;
