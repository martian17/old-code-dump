var b = function(a,b,c,d,t){
    //returns coords
    var x = a[0]+3*(b[0]-a[0])*t+3*(a[0]-2*b[0]+c[0])*(t**2)+(-a[0]+3*b[0]-3*c[0]+d[0])*(t**3);
    var y = a[1]+3*(b[1]-a[1])*t+3*(a[1]-2*b[1]+c[1])*(t**2)+(-a[1]+3*b[1]-3*c[1]+d[1])*(t**3);
    return [x,y];
};


var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

var ctx = canvas.getContext("2d");
ctx.beginPath();

var t = 0;

for(var t = 0; t < 1; t+=0.01){
    if(t > 1){
        t = 1;
    }
    var coords = b([100,300],[300,400],[300,100],[400,200],t);
    ctx.lineTo(coords[0],coords[1]);
    if(t === 1){
        break;
    }
}

ctx.stroke();

var a = [100,300];
var b = [300,400];
var c = [300,100];
var d = [400,200];

ctx.beginPath();
ctx.moveTo(a[0],a[1]);
ctx.lineTo(b[0],b[1]);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(c[0],c[1]);
ctx.lineTo(d[0],d[1]);
ctx.stroke();




var cubicpolysolver = function(x3,x2,x1,x0){

}

