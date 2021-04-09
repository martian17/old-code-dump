const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 2002;

const server = http.createServer((req, res) => {
    var urlinfo = url.parse(req.url,true);
    var path = "/Users/yoshi/programs/algorithms"+urlinfo.pathname;
    var query = urlinfo.query;
    if(query && JSON.parse(JSON.stringify(query)).hasOwnProperty("rawfile")){
        console.log("I");
        returnFile(res,path,urlinfo);
    }else if(filetype(path) === "js"){//return html wrapper
        console.log("II");
        jsHTMLWrapper(res,path,urlinfo);
    }else{//return file as it is
        console.log("III");
        returnFile(res,path,urlinfo);
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


var returnFile = function(res,path){
    fs.exists(path, function(exists){
      if (exists) {
        //  status code
        var stats = fs.lstatSync(path_string);
        if(stats.isFile()){
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
              "Content-Type": "application/octet-stream",
              "Content-Disposition": "attachment; filename=" + path
            });
            var readStream = fs.createReadStream(path);
            readStream.pipe(res);
        }else if(stats.isDirectory()){
            returnDir(res,path);
        }
        //end status code

      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
};

var jsHTMLWrapper = function(res,path,urlinfo){
    var pl = path.split("/");
    var htmlbase = `<!DOCTYPE html>
<html lang="en-US">
<head><title>`+pl[pl.length-1]+`</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<script src="`+urlinfo.pathname+`?rawfile=true"></script>
</body>`;
    res.write(htmlbase);
    res.statusCode = 200;
    res.end();
};


var filetype = function(path){
    var a = path.split(".");
    return a[a.length-1];
};


var returnDir = function(res,path){
    //get contents of the directory
    fs.readdir(path, function(err, items) {
        if(err){
            return false;
        }var htmlbase = `<!DOCTYPE html>
<html lang="en-US">
<head><title>`+path+`</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<h1>Index of `+path+`</h1>
<ul>`;
        for (var i=0; i<items.length; i++) {
            htmlbase+="<li><a href=\""+path+items[i]+"\">"+items[i]+"</a></li>"
        }
        htmlbase+="</ul></body></html>";
    });
};


