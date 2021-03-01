//------------------------
// SERVER JS THAT HANDLES
// HTML FILE READING AND
// PAGE RESPONSES
//------------------------

// Initiate file streaming
const fs = require('fs');

//------------------------
// FILE READING
//------------------------
const errorPage = fs.readFileSync(`${__dirname}/../client/404.html`);

const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/home.html`);
const infoPage = fs.readFileSync(`${__dirname}/../client/information.html`);
const inputPage = fs.readFileSync(`${__dirname}/../client/input.html`);

const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

//------------------------
// PAGE RESPONSES
//------------------------
const get404Response = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
};
const getAdminResponse = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(adminPage);
    response.end();
};
const getAppResponse = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(appPage);
    response.end();
};
const getHomeResponse = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(homePage);
    response.end();
};
const getinfoResponse = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(infoPage);
    response.end();
};
const getInputResponse = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(inputPage);
    response.end();
};
const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(cssPage);
    response.end();
};

//------------------------
// EXPORT FUNCTIONS
//------------------------
module.exports = {
    get404Response,
    getAdminResponse,
    getAppResponse,
    getHomeResponse,
    getInputResponse,
    getinfoResponse,
    getCSS,
};