const readline = require('readline');
const fs = require('fs');
const PATH = require('path');



var directoryFromPath = function(path){
    var p = path.split("/");
};

var requireDependencies = function(path){
    var readStream = fs.createReadStream(path);
    var dir = directoryFromPath(path);

    const rl = readline.createInterface({
      input: readStream
    });

    rl.on('line', (line) => {
        if(cnt > 10){
            rl.pause();
            rl.close();
            rl.removeAllListeners();
            readStream.destroy();
            console.log("exited");
            return false;
        }
        console.log(`${cnt}:${line}`);
        cnt++;
    });
};