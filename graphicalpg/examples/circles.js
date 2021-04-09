//require ../graphics3.js
//require /animate/animate.js






var rotateX = function(x,y,a){
    return Math.cos(a)*x - Math.sin(a)*y;
};

var rotateY = function(x,y,a){
    return Math.sin(a)*x + Math.cos(a)*y;
};

var xyRenderData = function(x,y,renderData){
    var x1 = x-renderData.x+renderData.w/2;
    var y1 = y-renderData.y+renderData.h/2;
    var x11 = rotateX(x1,y1,renderData.a);
    var y11 = rotateY(x1,y1,renderData.a);
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
            ctx.arc(xy[0],xy[1],obj.r,0,6.28);
            ctx.closePath();
            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);

world.addType(
    "rect",
    //requires:
    //.lx
    //.ly
    //.cx
    //.cy
    //.a
    //.w
    //.h
    {
        render:function(obj,renderData){
            //console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            //converting 4 points
            //there is a center coord too

            ctx.beginPath();
            var xy;
            var tlx = obj.x + rotateX(-obj.cx,-obj.cy,obj.a);
            var tly = obj.y + rotateY(-obj.cx,-obj.cy,obj.a);
            xy = xyRenderData(tlx,tly,renderData);
            ctx.lineTo(xy[0],xy[1]);
            var trx = obj.x + rotateX(obj.w-obj.cx,-obj.cy,obj.a);
            var try1 = obj.y + rotateY(obj.w-obj.cx,-obj.cy,obj.a);
            xy = xyRenderData(trx,try1,renderData);
            ctx.lineTo(xy[0],xy[1]);//avoiding the reserved word
            var brx = obj.x + rotateX(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            var bry = obj.y + rotateY(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            xy = xyRenderData(brx,bry,renderData);
            ctx.lineTo(xy[0],xy[1]);
            var blx = obj.x + rotateX(-obj.cx,obj.h-obj.cy,obj.a);
            var bly = obj.y + rotateY(-obj.cx,obj.h-obj.cy,obj.a);
            xy = xyRenderData(blx,bly,renderData);
            ctx.lineTo(xy[0],xy[1]);
            ctx.closePath();

            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);


world.addType(
    "rect",
    //requires:
    //.lx
    //.ly
    //.cx
    //.cy
    //.a
    //.w
    //.h
    {
        render:function(obj,renderData){
            //console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            //converting 4 points
            //there is a center coord too

            ctx.beginPath();
            var xy;
            var tlx = obj.x + rotateX(-obj.cx,-obj.cy,obj.a);
            var tly = obj.y + rotateY(-obj.cx,-obj.cy,obj.a);
            xy = xyRenderData(tlx,tly,renderData);
            ctx.lineTo(xy[0],xy[1]);
            var trx = obj.x + rotateX(obj.w-obj.cx,-obj.cy,obj.a);
            var try1 = obj.y + rotateY(obj.w-obj.cx,-obj.cy,obj.a);
            xy = xyRenderData(trx,try1,renderData);
            ctx.lineTo(xy[0],xy[1]);//avoiding the reserved word
            var brx = obj.x + rotateX(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            var bry = obj.y + rotateY(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            xy = xyRenderData(brx,bry,renderData);
            ctx.lineTo(xy[0],xy[1]);
            var blx = obj.x + rotateX(-obj.cx,obj.h-obj.cy,obj.a);
            var bly = obj.y + rotateY(-obj.cx,obj.h-obj.cy,obj.a);
            xy = xyRenderData(blx,bly,renderData);
            ctx.lineTo(xy[0],xy[1]);
            ctx.closePath();

            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
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


world.root.createObj({
    type:"circle",
    r:10,
    lx:0,
    ly:0
});

var rect = world.root.createObj({
    type:"rect",
    lx:10,
    ly:10,
    w:20,
    h:10,
    la:1.5,
    cx:10,
    cy:5
});

rect.createObj({
    type:"circle",
    r:10,
    lx:40,
    ly:40
});

var c = document.createElement("canvas");
document.body.appendChild(c);
var rd1 = {
    canvas:c,
    ctx:c.getContext("2d"),
    w:c.width,
    h:c.height,
    x:0,//center coordinates
    y:0,
    a:0
};


var line = rect.createObj({
    type:"line",
    lx:20,
    ly:20,
    lx1:40,
    ly1:40,
});

world.render(rd1);




var aqueue = new AnimationQueue();
aqueue.add(function(cut){
    rect.la += 0.1;
    world.render(rd1);
});