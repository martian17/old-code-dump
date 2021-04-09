//require ../graphics3.js

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

var c = document.createElement("canvas");
c.width = 1000;
c.height = 1000;
document.body.appendChild(c);
var rd1 = {
    canvas:c,
    ctx:c.getContext("2d"),
    w:c.width,
    h:c.height,
    x:0,//center coordinates
    y:0,
    a:0,
    zoom:50
};


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

//event code end




world.render(rd1);




var MouseEvent = function(rd1){//takes in rd1
    var canvas = rd1.canvas;
    canvas.addEventListener("click",function(){

    });
    canvas.addEventListener("mousedown",function(){

    });
    var eventTypes = {
        mousedown:{},
        mouseup:{}
    };

    this.add = function(obj,type,callbakc){
        eventTypes[type][obj.id] = [obj,callback];
    }
}

var mouseEvent = new MouseEvent(rd1);

mouseEvent.add(circle,"mousedown",function(){
    //do something

});





