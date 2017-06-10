var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log('req', req, 'res', res);


//if get request from client and page exists in archive 
  fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
  
};

//httpHelp.serveAssets('res', 'pagedata', 'callback function');
//load html onto server (fs.readFile?)

//If typeof request is GET
  //load "loading" HTML