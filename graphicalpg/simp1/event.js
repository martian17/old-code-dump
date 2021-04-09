

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
                    (callback.bind(obj))(e);
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
//event();



/*
var aqueue = new AnimationQueue();
aqueue.add(function(cut){
    rect.la += 0.1;
    world.render(rd1);
});*/