var HTML = require("./htmldoc.js");


const http = require('http');
const fs = require('fs');
const url = require('url');
const readline = require('readline');
const path = require('path');

const HomeDir = "/Users/yoshi/works/programs/algorithms";


var pack = function(jspath){//path has to be a js file
    //path can be local or global
    //var dirname = process.cwd();
    jspath = path.relative(HomeDir,path.join(process.cwd(),jspath));
    requireDependencies(jspath,
    function(dependencies){
        dependencies = depencenciesToArray(dependencies);
        var d = new HTML.DOC();
        var pn = jspath.split("/");
        d.title = pn[pn.length-1];

        getFileTexts(dependencies,(texts)=>{
            for(var i = 0; i < texts.length; i++){
                d.addToBody("<script>"+texts[i]+"</script>\n");
            }

            //console.log("|||||");
            //console.log(d.text);
            console.log("saved the new file at: "+path.join(HomeDir,jspath)+".html");
            fs.writeFile(path.join(HomeDir,jspath)+".html", d.text,(err)=>{if(err)throw err});
            //console.log("|||||");
        });
    });
};

var getFileTexts = function(arr,callback){
    var retarr = new Array(arr.length);
    callback = new Callback(callback);
    var readIthFile = function(arr,i,callback){
        fs.readFile(path.join(HomeDir,arr[i]), function (err, file) {
            if (err) {
                throw err;
            }
            retarr[i] = file.toString();
            callback.executeCallback(retarr);
        });
    };
    for(var i = 0; i < arr.length; i++){
        callback.delayCallback();
        readIthFile(arr,i,callback);
    }
}



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











//console.log(process.argv);

pack(process.argv[2]);


