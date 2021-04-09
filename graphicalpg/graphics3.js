var TwoDWorld = function(){//might make a 3d version soon
    //id gen
    var IDGENNOW = 0;
    var IDGEN = function(){
        return IDGENNOW++;
    };



    //obj methods
    //del
    //addObj
    //createObj
    //renderObj
    //updateChildren
    var del = function(){
        delete this.parent.children[this.id];
        delete this.that.objs[this.id];
        delete this.that.objsByTypes[this.type][this.id];
    };
    var addObj = function(o){
        if(o.parent)delete o.parent.children[o.id];
        o.parent = this;
        this.children[o.id] = o;
    };
    var createObj = function(o){
        var p = Object.create(objproto);
        for(var key in o){
            p[key] = o[key];
        }
        p.children = {};//get objects out of the way
        p.id = IDGEN();
        p.parent = this;
        this.children[p.id] = p;
        this.that.objs[p.id] = p;
        this.that.objsByTypes[p.type][p.id] = p;
        return p;
    };
    var renderObj = function(renderData){
        //"this" is the object
        //can access object by using this
        var type = this.that.types[this.type];
        type.render(this,renderData);
    };
    //sideeffect:updates children's coordinates
    var updateChildren = function(callback){
        this.updateXYA();
        callback(this);
        for(var key in this.children){
            this.children[key].updateChildren(callback);
        }
    };
    var updateXYA = function(){
        //console.log(this);
        this.a = this.parent.a + this.la;
        //parent because obj xy will be the center of obj rotation
        var dx = Math.cos(this.parent.a)*this.lx - Math.sin(this.parent.a)*this.ly;
        var dy = Math.sin(this.parent.a)*this.lx + Math.cos(this.parent.a)*this.ly;
        this.x = this.parent.x + dx;
        this.y = this.parent.y + dy;
    };

    var objproto = {
        x:0,
        y:0,
        a:0,
        lx:0,
        ly:0,
        la:0,
        w:0,
        h:0,
        r:0,
        cx:0,
        cy:0,
        lx1:0,
        ly1:0,
        that:this,
        polygon:null,
        root:false,
        parent:null,
        //children:{},
        addObj:addObj,
        createObj:createObj,
        delete:del,
        render:renderObj,
        type:"initial",
        updateChildren:updateChildren,
        updateXYA:updateXYA,
        fillStyle:"#000000",
        strokeStyle:"#000000"
    };

    //interface to the outside world
    this.objs = {};
    this.root = Object.create(objproto);
    this.root.root = true;
    this.root.parent = this.root;
    this.root.children = {};
    this.types = {
        initial:{
            render:function(){}
        }
    };
    this.objsByTypes = {
        initial:[]
    };

    this.render = function(renderData){
        //console.log(this.objs);
        this.root.updateChildren(a=>{});
        renderData.ctx.clearRect(0,0,renderData.w,renderData.h);
        //may need additional improvements:
        //see if the object is intersecting with the window before checking
        for(var key in this.objs){
            if(obj.onrender)obj.onrender;
            this.objs[key].render(renderData);
        }
    };
    this.addType = function(name,t){
        this.types[name] = t;
        this.objsByTypes[name] = {};
    };
};



/*

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
            console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            var xy = xyRenderData(obj.x,obj.y,renderData);
            console.log(xy[0],xy[1],obj.r,0,6.28);
            ctx.arc(xy[0],xy[1],obj.r,0,6.28);
            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);

world.addType(
    "rect",
    {
        render:function(obj,renderData){
            console.log(obj,renderData);
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            //converting 4 points
            //there is a center coord too
            var tlx = obj.x + rotateX(-obj.cx,-obj.cy,obj.a);
            var tly = obj.y + rotateY(-obj.cx,-obj.cy,obj.a);
            ctx.lineTo(tlx,tly);
            var trx = obj.x + rotateX(obj.w-obj.cx,-obj.cy,obj.a);
            var try = obj.y + rotateY(obj.w-obj.cx,-obj.cy,obj.a);
            ctx.lineTo(trx,try);
            var blx = obj.x + rotateX(-obj.cx,obj.h-obj.cy,obj.a);
            var bly = obj.y + rotateY(-obj.cx,obj.h-obj.cy,obj.a);
            ctx.lineTo(tlx,tly);
            var brx = obj.x + rotateX(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            var bry = obj.y + rotateY(obj.w-obj.cx,obj.h-obj.cy,obj.a);
            ctx.lineTo(brx,bry);
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
    x:0,
    y:0
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

world.render(rd1);

*/





