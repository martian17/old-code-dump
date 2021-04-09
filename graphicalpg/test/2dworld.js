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
        //do the same with the children
        //delete the children as well
        for(var key in this.children){
            this.children[key].del();
        }
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
        del:del,
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
            //if(this.objs[key].onrender)this.objs[key].onrender;
            this.objs[key].render(renderData);
        }
    };
    this.addType = function(name,t){
        this.types[name] = t || function(){};//renfer or do nothing
        this.objsByTypes[name] = {};
    };
};



/*
//event code start

var canvasEvents = {};

//ONLY SUPPORTS CIRCULAR COLLISION
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
*/






