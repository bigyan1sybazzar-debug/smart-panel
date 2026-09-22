process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Always run in production mode on the server to prevent SWC/compiler thread crashes
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  if (typeof PhusionPassenger !== 'undefined') {
    server.listen('passenger', () => {
      console.log('> Next.js production server ready via Phusion Passenger');
    });
  } else {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`> Next.js production server ready on port ${port}`);
    });
  }
}).catch((err) => {
  console.error('Failed to start Next.js production server:', err);
  process.exit(1);
});
