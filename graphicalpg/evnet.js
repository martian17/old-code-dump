//require ./graphics4.js

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

world.addType("event");

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
    zoom:0.5
};

world.render(rd1);

var animate = function(t){
    world.render(rd1);
    window.requestAnimationFrame(animate);
};
window.requestAnimationFrame(animate);



//event code start

var canvasEvents = {};

var event = function(obj,type,callback){
    if(!(type in canvasEvents)){//unknown type of event
        canvasEvents[type] = {};//list of objects
        //ideally doubly inked list
        canvas.addEventListener(type,function(e){
            //type is defined in this scope lol
            var evobjs = canvasEvents[type];
            for(var key in evobjs){
                var evobj = evobjs[key];
                var obj = evobj[0];
                var callback = evobj[1];

                if(objIntersection(e,rd1,obj)){//if intersecting
                    //trigger event
                    callback.bind(obj)();
                    break;//two canvasEvents can't be triggered at the same time
                };
            }
        });
    }
    canvasEvents[type][obj.id] = [obj,callback];
};


var objIntersection = function(e,renderData,obj){
    var cx = e.offsetX;
    var cy = e.offsetY;
    var oxy = xyRenderData(obj.x,obj.y,renderData);
    var ox = oxy[0];
    var oy = oxy[1];
    var or = obj.r*renderData.zoom;
    var dist2 = (ox-cx)**2+(oy-cy)**2;
    if(or**2 > dist2){//intersecting
        return true;
    }
    return false;
};

//event code end




var c1 = world.root.createObj({
    type:"circle",
    r:10,
    lx:0,
    ly:0
});
var c2 = c1.createObj({
    type:"circle",
    r:10,
    lx:20,
    ly:0
});
var c3 = c2.createObj({
    type:"circle",
    r:10,
    lx:40,
    ly:0
});
var c4 = c3.createObj({
    type:"circle",
    r:10,
    lx:60,
    ly:0
});



event(c4,"click",function(){
    console.log("click",this);
});

event(c3,"mousedown",function(){
    console.log("mousedown",this);
});

event(c3,"mouseup",function(){
    console.log("mouseup",this);
});

event(c2,"mousemove",function(){
    console.log("mousemove",this);
});

