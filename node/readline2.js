const readline = require('readline');
const fs = require('fs');


var cnt = 0;

const rl = readline.createInterface({
  input: fs.createReadStream('./server.js')
});

rl.resumeScheduled = false;

console.log(rl);

var readlineinterface = rl.on('line', (line) => {
    if(cnt > 10){
        console.log(cnt);
        rl.pause();
        readlineinterface.resume();
        //rl.resume();
        //rl.pause();
        //rl.resume();
        //rl.close();
        //rl.question("Can I pause the execution?", (res)=>{console.log(res)})
        //console.log("exited");
    }
    console.log(`${cnt}:${line}`);
    cnt++;
});

rl.on('close', () => {
  console.log('Readline closed.');
});

rl.on('pause', () => {
  console.log('Readline paused.');
});

rl.on('resume', () => {
  console.log('Readline resumed.');
});

rl.on('SIGCONT', () => {
  console.log("SIGCONT");
});

rl.on('SIGINT', () => {
    console.log("SIGINT");
});

rl.on('SIGTSTP', () => {
    console.log("SIGTSTP");
});