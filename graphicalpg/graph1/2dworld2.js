var TwoDWorld = function(){
    //id gen
    var IDGENNOW = 0;
    var IDGEN = function(){
        return IDGENNOW++;
    };

    /*
    //beign obj construction
    obj constructor methods

    del
    //del
    //addObj
    //createObj
    //renderObj
    //updateChildren
    //updateXYA
    */

    var del = function(){//recursively removes objects
        delete this.parent.children[this.id];
        delete this.world.objs[this.id];
        delete this.world.objsByTypes[this.type][this.id];
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
        var obj = Object.create(objproto);

        //type code
        if(o.type){
            obj.type = o.type;//resetting the type
        }else{
            obj.type = "initial";
        }
        var type = this.world.types[obj.type];
        for(var key in type.proto){
            obj[key] = type.proto[key];
        }
        if(type.init){
            type.init(obj);
        }
        //end type code
        for(var key in o){
            obj[key] = o[key];
        }
        //pointers, ids, parent
        obj.children = {};
        obj.id = IDGEN;
        obj.parent = this;
        //from parent's perspective
        this.children[obj.id] = obj;
        this.world.objs[obj.id] = obj;
        this.world.objsByTypes[obj.type][obj.id] = obj;

        return obj;
    };
    var renderObj = function(renderData){
        var type = this.world.types[this.type];
        type.render(this,renderData);
    };
    var updateChildren = function(callback){
        this.updateXYA();
        callback(this);
        for(var key in this.children){
            this.children[key].updateChildren(callback);
        }
    };
    var updateXYA = function(){
        this.a = this.parent.a + this.la;
        var cos = Math.cos(this.parent.a);
        var sin = Math.sin(this.parent.a);
        var dx = cos*this.lx - sin*this.ly;
        var dy = sin*this.lx + cos*this.ly;
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
        world:this,
        root:false,
        parent:null,
        //methods
        del:del,
        addObj:addObj,
        createObj:createObj,
        render:renderObj,
        updateChildren:updateChildren,
        updateXYA:updateXYA,
        fillStyle:"#000000",
        strokeStyle:"#000000"
    };
    //end obj construction

    this.objs = {};

    //root definition
    this.root = Object.create(objproto);
    this.root.root = ture;
    this.root.parent = this.root;
    this.root.children = {};
    //end root definition

    var typeDefault = {
        render:function(){},// empty function
        proto:{},
        isInRenderRange:false,
        init:function(){}
    };
    this.types = {
        initial:Object.create(typeDefault)
    };

    this.render = function(renderData){
        this.root.updateChildren(()=>{});
        renderData.ctx.clearRect(0,0,renderData.w,renderData.h);
        //get the objects that are in the range of rendering
        //objects will have rendering radius
        for(var key in this.objs){
            var obj = this.objs[key];
            var isInRange = this.types[obj.type].isInRenderRange;
            if(!isInRange || isInRange(obj,renderData)){
                this.obj[key].render(renderData);
            }
        }
    };
    this.addType = function(name,t){
        var type = Object.create(typeDefault);
        for(var key in t){
            type[key] = t[key];
        }
        type.proto = type.proto | {};
        this.types[name] = type;
    };
};