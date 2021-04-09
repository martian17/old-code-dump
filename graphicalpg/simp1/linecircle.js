//require ./2dworld.js


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


var rotateX = function(x,y,a){
    return Math.cos(a)*x - Math.sin(a)*y;
};

var rotateY = function(x,y,a){
    return Math.sin(a)*x + Math.cos(a)*y;
};

var xyRenderData = function(x,y,renderData){
    var x1 = (x-renderData.x)*renderData.zoom+renderData.w/2;
    var y1 = (y-renderData.y)*renderData.zoom+renderData.h/2;
    var x11 = rotateX(x1,y1,renderData.a);
    var y11 = rotateY(x1,y1,renderData.a);
    return [x11,y11];
};

var renderDataXY = function(x,y,renderData){//exact inverse
    var x1 = rotateX(x,y,-renderData.a);
    var y1 = rotateY(x,y,-renderData.a);
    var x11 = (x1-renderData.w/2)/renderData.zoom+renderData.x;
    var y11 = (y1-renderData.h/2)/renderData.zoom+renderData.y;
    return [x11,y11];
};


var world = new TwoDWorld();
world.addType(
    "circle",
    {
        render:function(obj,renderData){
            //console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            var xy = xyRenderData(obj.x,obj.y,renderData);
            //console.log(xy[0],xy[1],obj.r,0,6.28);
            ctx.beginPath();
            ctx.arc(xy[0],xy[1],obj.r*renderData.zoom,0,6.28);
            ctx.closePath();
            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);

world.addType(
    "collider",
    {
        render:function(){}//don't render
    }
);

world.addType(
    "line",
    //requires:
    //.lx
    //.ly
    //.lx1
    //.ly1
    //.a
    {
        render:function(obj,renderData){
            //console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            //tno center coord

            ctx.beginPath();
            var xy;
            xy = xyRenderData(obj.x,obj.y,renderData);
            ctx.moveTo(xy[0],xy[1]);
            var ldx = obj.lx1-obj.lx;
            var ldy = obj.ly1-obj.ly;
            var x1 = obj.x + rotateX(ldx,ldy,obj.a);
            var y1 = obj.y + rotateY(ldx,ldy,obj.a);
            xy = xyRenderData(x1,y1,renderData);
            ctx.lineTo(xy[0],xy[1]);
            ctx.closePath();

            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);


/*
var animate = function(t){
    world.render(rd1);
    window.requestAnimationFrame(animate);
};
window.requestAnimationFrame(animate);
*/
