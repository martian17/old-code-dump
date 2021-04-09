var Shapes = function(){
    //id gen
    var IDGENNOW = 0;
    var IDGEN = function(){
        return IDGENNOW++;
    };

    ////obj methods
    ////all operate on "this"
    //del
    //addObj
    //createObj
    //renderObj
    //updateChildren
    var del = function(){
        delete this.parent.children[this.id];
        delete this.world.shapes[this.id];
        delete this.that.shapesByTypes[this.type][this.id];
        for(var key in this.children){
            //delete children (recursion)
            this.children[key].del();
        }
    };
    var addShape = function(shape){
        if(shape.parent)delete shape.parent.children[shape.id];
        shape.parent = this;
        this.children[shape.id] = shape;
    };
    var createShape = function(o){
        var shape = Object.create(shapeproto);
        for(var key in o){
            shape[key] = o[key];
        }
        shape.children = {};//set the children property because no copying by Object.create()
        shape.id = IDGEN();
        shape.parent = this;

        this.children[shape.id] = shape;
        this.world.shapes[shape.id] = shape;
        this.world.shapesByTypes[shape.type][shape.id] = shape;
        return shape;
    };
    var renderShape = function(renderData){
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

}