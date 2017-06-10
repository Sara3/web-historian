var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
//var inputUrl = require('./public/index.html');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log('req', req, 'res', res);
  //console.log(inputUrl.getInput());
  //console.log('req', req);
  // fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.end(data);
  // });
  console.log('req.method', req.method);
  if (req.method === 'GET') {
    var statusCode = 200;
    res.writeHead(statusCode, httpHelp.headers);
    //find the file 
    //archive.paths.siteAssets + '/index.html'
    console.log('URL: ', req.url);
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
      if (err) {
        console.log('--error--',err);
      }
      console.log('data', data);
      res.end(data);
    }); 
    //if file not found 
    // fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   res.end(data);
    // });

  if (req.method === 'POST') {
    console.log('POST GOT!');
    console.log('post---->', req.url);
    res.writeHead(302, httpHelp.headers);
    res.end();
  }
    
  }
 
// //if get request from client and page exists in archive 
//   fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.end(data);
//   });
  
  
};

//httpHelp.serveAssets('res', 'pagedata', 'callback function');
//load html onto server (fs.readFile?)

//If typeof request is GET
  //load "loading" HTML
  
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

var makeActionHandler = function(actionMap) {
  return function(request, response) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      sendResponse(response, '', 404);
    }
  };
};  
  
  
  
  
  
  
  
  
  
var objectIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  /*
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectIdCounter
  }
  */
];

var actions = {
  'GET': function(request, response) {
    sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    collectData(request, function(message) {
      message.objectId = ++objectIdCounter;
      messages.push(message);
      sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response) {
    sendResponse(response, null);
  }
};