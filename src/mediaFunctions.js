const fs = require('fs'); // pulls in file system module

const getRange = (req) => {
  let { range } = req.headers;
  if (!range) {
    range = 'bytes=0-';
  }

  const positions = range.replace(/bytes=/, '').split('-');

  return positions;
};

// Returns
const getPoints = (pos, stats) => {
  let start = parseInt(pos[0], 10);

  const total = stats.size;
  const end = pos[1] ? parseInt(pos[1], 10) : total - 1;

  if (start > end) {
    start = end - 1;
  }

  return [start, end, total];
};

const sendChunk = (points, response) => {
  const chunksize = (points[1] - points[0]) + 1;

  response.writeHead(206, {
    'Content-Range': `bytes ${points[0]}-${points[1]}/${points[2]}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
  });
};

const sendStream = (file, points, response) => {
  const start = points[0];
  const end = points[1];

  const stream = fs.createReadStream(file, { start, end });

  stream.on('open', () => {
    stream.pipe(response);
  });

  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });

  return stream;
};

module.exports.getRange = getRange;
module.exports.getPoints = getPoints;
module.exports.sendChunk = sendChunk;
module.exports.sendStream = sendStream;
