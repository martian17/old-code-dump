var HTML = require("./htmldoc.js");

const http = require('http');
const fs = require('fs');
const url = require('url');
const readline = require('readline');

const hostname = '127.0.0.1';
const port = 2002;
const HomeDir = "/Users/yoshi/programs/algorithms";

const server = http.createServer((req, res) => {
    var urlinfo = url.parse(req.url,true);
    var path = HomeDir+urlinfo.pathname;
    var query = urlinfo.query;
    var requestInfo = {};
    requestInfo.query = query;
    requestInfo.path = path;
    requestInfo.localPath = urlinfo.pathname;
    requestInfo.originalUrl = req.url;
    requestInfo.res = res;

    returnPage(requestInfo);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




var returnPage = function(requestInfo){
    fs.exists(requestInfo.path, function(exists){
      if (exists) {
        //  status code
        var stats = fs.lstatSync(requestInfo.path);
        console.log(requestInfo.originalUrl);
        if(stats.isDirectory()){
            returnDirectory(requestInfo);
        }else if(stats.isFile()){
            returnFile(requestInfo);
        }else{
            returnForbidden(requestInfo);
        }
      } else {
          returnFileNotFound(requestInfo);
      }
    });
};

var returnDirectory = function(requestInfo){
    fs.readdir(requestInfo.path, function(err, items) {
        if(err){
            return false;
        }
        var d = new HTML.DOC();
        d.addToBody("<h1>Index of "+requestInfo.localPath+"</h1>\n");
        var ul = new HTML.DOM("<ul>","</ul>\n");
        d.addToBody(ul);
        for(var i = 0; i < items.length; i++){
            ul.addChild("<li><a href=\""+slashEndPath(requestInfo.localPath)+items[i]+"\">"+items[i]+"</a></li>\n");
        }
        var res = requestInfo.res;
        res.writeHeader(200, {"Content-Type": "text"});
        res.write(d.text);
        res.end();
    });
};

var slashEndPath = function(path){
    if(path[path.length-1] !== "/"){
        return path+"/";
    }
    return path;
};

var returnFile = function(requestInfo){
    var res = requestInfo.res;
    fs.readFile(requestInfo.path, function (err, file) {
        if (err) {
            throw err;
        }
        //if(typeof file === "string"){
            if(isJSFile(requestInfo)&&(!isRawFile(requestInfo))){
                returnJSWrapper(requestInfo,file);
            }else{
                res.writeHeader(200, {"Content-Type": "text"});
                res.write(file);
                res.end();
            }
        /*}else{
            res.writeHeader(200, {"Content-Type": "text"});
            res.write(file);
            res.end();
            //var readStream = fs.createReadStream(requestInfo.path);
            //readStream.pipe(res);
        }*/
    });
};


var isRawFile = function(requestInfo){
    var query = requestInfo.query;
    if(query.rawfile === "true"){
        return true;
    }
    return false;
};

var returnJSWrapper = function(requestInfo,file){
    var res = requestInfo.res;
    var d = new HTML.DOC();
    d.title = requestInfo.localPath;
    var jsfiles = requireDependencies(requestInfo.path);//returns local path
    for(var i = 0; i < jsfiles.length; i++){
        d.addToBody("<script src=\""+HomeDir+jsfiles[i]+"?rawfile=true"+"\"></script>\n");
    }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(d.text);
    res.end();
};

var isJSFile = function(requestInfo){
    var path = requestInfo.path;
    var a = path.split(".");
    if(a[a.length-1] === "js"){
        return true;
    }
    return false;
};

var returnForbidden = function(requestInfo){
    requestInfo.res.writeHead(403, {"Content-Type": "text/plain"});
    requestInfo.res.end("ERROR 403 Forbidden");
}

var returnFileNotFound = function(requestInfo){
    requestInfo.res.writeHead(404, {"Content-Type": "text/plain"});
    requestInfo.res.end("ERROR 404 File does not exist");
};












//Dependencies Server


var requireDependencies = function(path){
    var dependencies = [];
    var rl = readline.createInterface({
      input: fs.createReadStream(HomeDir+path)
    });
    rl.on('line', (line) => {
        if(line.slice(0,10) === "//require "){
            var depencency = line.slice(10);
            dependencies.push(depencency);
            var childDependencies = requireDependencies(depencency);
            for(var i = 0; i < childDependencies.length; i++){
                dependencies.push(childDependencies[i]);
            }
        }else{
            //want to stop it
            //but for now it just do nothing
        }
    });
    return dependencies;
};



