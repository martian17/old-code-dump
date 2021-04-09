//require shapes.js

var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
var rd1 = {
    canvas:canvas,
    ctx:canvas.getContext("2d"),
    w:canvas.width,
    h:canvas.height,
    x:0,//center coordinates
    y:0,
    a:0,
    zoom:50
};


