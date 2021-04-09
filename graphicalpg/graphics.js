var TwoDWorld = function(){
    var IDGENNOW = 0;
    var IDGEN = function(){
        return IDGENNOW++;
    };
    objs = {};
    this.types = {
        initial:{
            render:function(){}
        }
    };
    this.addType = function(name,t){
        this.types[name] = t;
    };
    var del = function(){
        delete this.parent.children[this.id];
    };
    var addObj = function(o){
        delete o.parent.children[o.id];
        o.parent = this;
        this.children[o.id] = o;
    };
    var createObj = function(o){
        var p = Object.create(objproto);
        for(var key in o){
            p[key] = o[key];
        }
        p.id = IDGEN();
        objs[p.id] = p;
        this.children[p.id] = p;
        p.parent = this;
    };
    var renderObj = function(renderData){
        //"this" is the object
        //can access object by using this
        var type = this.types[this.type];
        type.render(this,renderData);
    };
    this.render = funciton(renderData){
        for(key in objs){
            objs[key].render(renderData);
        }
    };
    var traverse = function(callback){
        this.updateXYA();
        callback(this);
        for(var key in this.children){
            this.children[key].traverse(callback);
        }
    };
    var updateXYA = function(){
        this.a = this.parent.a + this.la;
        var dx = Math.cos(this.a)*this.lx - Math.sin(this.a)*this.ly;
        var dy = Math.sin(this.a)*this.lx + Math.cos(this.a)*this.ly;
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
        polygon:null,
        root:false,
        parent:null,
        children:{},
        addObj:addObj,
        createObj:createObj,
        delete:del,
        render:renderObj,
        type:"initial",
        traverse:traverse,
        updateXYA:updateXYA,
        fillStyle:"#000000",
        strokeStyle:"#000000"
    };
    this.root = Object.create(objproto);
    this.root.root = true;
};


var world = new TwoDWorld();
world.addType(
    "circle",
    {
        render:function(obj,renderData){
            var canvas = renderData.canvas;
            var ctx = renderData.ctx;
            ctx.arc(obj.x,obj.y,0,6.28,obj.r);
            ctx.fillStyle = obj.fillStyle;
            ctx.strokeStyle = obj.strokeStyle;
            ctx.fill();
            ctx.stroke();
        }
    }
);


world.root.addObj({
    type:"circle",
    r:10,
    x:100,
    y:100
});




