//this is the current version of server



//error handling

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});









var HTML = require("./htmldoc.js");

const http = require('http');
const fs = require('fs');
const url = require('url');
const readline = require('readline');
const path = require('path');

const hostname = '127.0.0.1';
const port = 2002;
const HomeDir = "/Users/yoshi/programs/algorithms";

const server = http.createServer((req, res) => {
    var urlinfo = url.parse(req.url,true);
    var globalPath = HomeDir+urlinfo.pathname;
    var query = urlinfo.query;
    var requestInfo = {};
    requestInfo.query = query;
    requestInfo.globalPath = globalPath;
    requestInfo.localPath = urlinfo.pathname;
    requestInfo.originalUrl = req.url;
    requestInfo.res = res;

    returnPage(requestInfo);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




var returnPage = function(requestInfo){
    fs.exists(requestInfo.globalPath, function(exists){
      if (exists) {
        //  status code
        var stats = fs.lstatSync(requestInfo.globalPath);
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
    fs.readdir(requestInfo.globalPath, function(err, items) {
        if(err){
            return false;
        }
        var d = new HTML.DOC();
        d.addToBody("<h1>Index of "+requestInfo.localPath+"</h1>\n");
        var ul = new HTML.DOM("<ul>","</ul>\n");
        d.addToBody(ul);
        for(var i = 0; i < items.length; i++){
            ul.addChild("<li><a href=\""+path.join(requestInfo.localPath,items[i])+"\">"+items[i]+"</a></li>\n");
        }
        var res = requestInfo.res;
        res.writeHeader(200, {"Content-Type": "text"});
        res.write(d.text);
        res.end();
    });
};


var returnFile = function(requestInfo){
    var res = requestInfo.res;
    fs.readFile(requestInfo.globalPath, function (err, file) {
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
            //var readStream = fs.createReadStream(requestInfo.globalPath);
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
    var jsfiles = requireDependencies(requestInfo.localPath,(dependencies)=>{
        var jsfiles = depencenciesToArray(dependencies);
        console.log(dependencies,jsfiles);
        console.log("111: ",jsfiles);
        for(var i = 0; i < jsfiles.length; i++){
            d.addToBody("<script src=\""+jsfiles[i]+"?rawfile=true"+"\"></script>\n");
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(d.text);
        res.end();
    });//returns local path (because that's the form the server recognizes)
};

var depencenciesToArray = function(dependencies){
    var dephash = {};
    var arr = [];
    var r1 = function(dep){
        for(var i = 0; i < dep.children.length; i++){
            r1(dep.children[i]);
        }
        if(!dephash[dep.url]){
            dephash[dep.url] = true;
            arr.push(dep.url);
        }
    };
    r1(dependencies);
    return arr;
};

var isJSFile = function(requestInfo){
    if(path.extname(requestInfo.globalPath) === ".js"){
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







var requireDependencies = function(localPath,callback){
    var dependencies = {url:localPath,children:[]};
    requireDependenciesKernel(localPath,dependencies,new Callback(callback),dependencies);
};


var requireDependenciesKernel = function(localPath,rootd,callback,locald){
    callback.delayCallback();
    var dirname = path.dirname(localPath);
    readByLine(path.join(HomeDir,localPath),
    function(line,exit){
        if(line.slice(0,10) === "//require "){
            var jsurl = line.slice(10);
            if(!path.isAbsolute(jsurl)){//if it is not absolute
                jsurl = path.normalize(path.join(dirname,jsurl));
            }
            var locald1 = {children:[],url:jsurl};
            locald.children.push(locald1);
            //yeah!!! It's so functional
            requireDependenciesKernel(jsurl,rootd,callback,locald1);
        }else{
            exit();
        }
    }).exit(function(){
        callback.executeCallback(rootd);
    }).fail(function(){
        callback.executeCallback(rootd);
        throw new Error("failed to find the file: "+localPath);
    });
};





///////////////////////////This part is utility


// this is for controlling callback

var Callback = function(callback){
    this.callback = callback;
    this.cnt = 0;
    this.delayCallback = function(){
        this.cnt++;
    };
    this.executeCallback = function(arg){
        this.cnt--;
        if(this.cnt === 0){
            this.callback(arg);
        }
    };
};


var readByLine = function(globalPath,callback){
    fs.exists(globalPath, function(exists){//if exists
        if (exists) {
            var readStream = fs.createReadStream(globalPath);
            var rl = readline.createInterface({
              input: readStream
            });
            rl.on('line', (line) => {
                callback(line,function(){
                    rl.pause();
                    rl.close();
                    rl.removeAllListeners();
                    readStream.destroy();
                });
            }).on('close', () => {
                events.exit();
            });
        }else{
            events.fail();
        }
    });

    var events = {};
    events.fail = function(){};
    events.exit = function(){};
    var setFail = function(callback){
        events.fail = callback;
        return returnObj;
    };
    var setExit = function(callback){
        events.exit = callback;
        return returnObj;
    };
    var returnObj = {
        fail:setFail,
        exit:setExit
    };
    return returnObj;
};
