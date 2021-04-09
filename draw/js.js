var canvas = document.getElementById("canvas");
canvas.width = 440;
canvas.height = 440;


var data = [[2,2],[4,1],[1,4],[0,0],[4,4],[5,2],[5,4],[5,7]];

var ctx = canvas.getContext("2d");


var zoom = 40;
var offset = 20;

var id = 0;

var play = function(){
    id++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#f0f";
    ctx.beginPath();
    ctx.moveTo(0,0*zoom+offset);
    ctx.lineTo(1000,0*zoom+offset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0*zoom+offset,0);
    ctx.lineTo(0*zoom+offset,1000);
    ctx.stroke();

    ctx.strokeStyle = "#0ff";
    ctx.fillStyle = "#f00";
    ctx.fillText(0,offset-10,0*zoom+offset);
    for(var i = 1; i < 10; i++){
      ctx.beginPath();
        ctx.moveTo(0,i*zoom+offset);
        ctx.lineTo(1000,i*zoom+offset);
        ctx.stroke();
        ctx.fillText(i,offset-6,i*zoom+offset);
    }

    ctx.fillText(0,0*zoom+offset,offset);
    for(var i = 1; i < 10; i++){
        ctx.beginPath();
        ctx.moveTo(i*zoom+offset,0);
        ctx.lineTo(i*zoom+offset,1000);
        ctx.stroke();
        ctx.fillText(i,i*zoom+offset,offset);
    }
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";

    var i = 0;

    var precoord = data[0];

    var drfunc = function(id0){
        if(id0 !== id){
            console.log(id0,id);
            return false;
        }
        console.log(data[i][0],data[i][1]);
        ctx.fillRect(offset+data[i][0]*zoom-2,offset+data[i][1]*zoom-2,4,4);
        ctx.beginPath();
        ctx.moveTo(offset+precoord[0]*zoom,offset+precoord[1]*zoom);
        ctx.lineTo(offset+data[i][0]*zoom,offset+data[i][1]*zoom);
        ctx.stroke();
        ctx.fillStyle = "#f00";
        ctx.fillText(data[i],offset+data[i][0]*zoom,offset+data[i][1]*zoom);
        ctx.fillStyle = "#000";
        precoord = data[i];
        if(i < data.length-1){
            setTimeout(drfunc.bind(null,id0),1000)
            i++;
        }
    };
    setTimeout(drfunc.bind(null,id),1000);
};
document.getElementById("input").addEventListener("input",
    function(){
        data = this.value.match(/\([^\(]+\)/g).map(a=>a.slice(1,-1).split(",").map(a=>parseInt(a)).filter(a=>!isNaN(a))).filter(a=>a.length===2);
        play();
    }
);

play();