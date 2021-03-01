// Pull in modules
const http = require('http');
const url = require('url');
const query = require('querystring');

// Import external .js files
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./responses.js');

// Set up port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Create urlStruct
const urlStruct = {
  '/getRoutine': jsonHandler.getRoutine,
  '/routines': jsonHandler.getRandomResponse,
  '/default-styles.css': htmlHandler.getCSS,
  '/app.html': htmlHandler.getAppResponse,
  '/': htmlHandler.getHomeResponse,
  '/home.html': htmlHandler.getHomeResponse,
  '/information.html': htmlHandler.getinfoResponse,
  '/admin.html': htmlHandler.getAdminResponse,
  '/input.html': htmlHandler.getInputResponse,
  '/error.html': htmlHandler.get404Response,
  notFound: htmlHandler.get404Response,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addRoutine') {
    const body = [];

    // https://nodejs.org/api/http.html
    // Error
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // Record chunk
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // No more data
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addRoutine(request, response, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  // Receive URL
  const parseURL = url.parse(request.url);
  const { pathname } = parseURL;

  // Determine additional params
  const params = query.parse(parseURL.query);
  const { limit } = params;

  // Get HEAD
  const httpMethod = request.method;

  // Post DATA
  if (httpMethod === 'POST') {
    handlePost(request, response, parseURL);
  } else if (parseURL.pathname === '/getRoutine') {
    jsonHandler.getRoutine(request, response);
  }

  // Get DATA
  else {
    // Send back head types
    let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
    acceptedTypes = acceptedTypes || [];

    // Send web page depending on what the URL is
    if (urlStruct[pathname]) {
      urlStruct[pathname](request, response, limit, acceptedTypes, httpMethod);
    } else {
      urlStruct.notFound(request, response);
    }
  }
};

// Create the server
http.createServer(onRequest).listen(port);
