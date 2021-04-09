//require /lib/htmlgen.js
//require ./linecircle.js
//require ./event.js
//require /lib/thash.js
//require ./initvals.js


//repel from the corners


var mouseDownActivated = false;
var objFollow = null;
var objFollowLX = 0;
var objFollowLY = 0;
var dragDX = 0;
var dragDY = 0;


var registerEvent = function(circle,coords,vels,i){
    event(circle,"mousedown",function(e){
        console.log(this);
        console.log(e);
        mouseDownActivated = true;
        objFollow = this;
        var xy = renderDataXY(e.offsetX-rd1.w/2,e.offsetY-rd1.h/2,rd1);//offset is the coordinates
        var dragDXO = xy[0] - objFollow.x;
        var dragDYO = xy[1] - objFollow.y;
        var deltaxy = xyRenderData(dragDXO,dragDYO,rd1);
        dragDX = deltaxy[0];
        dragDY = deltaxy[1];
        var x = e.offsetX-dragDX;
        var y = e.offsetY-dragDY;
        var xy = renderDataXY(x,y,rd1);
        var coords = objFollow.coords;
        var coord = coords[objFollow.coordsidx];
        objFollowLX = xy[0];
        objFollowLY = xy[1];
    });
};

document.addEventListener("mouseup",function(e){
    mouseDownActivated = false;
});
document.addEventListener("mousemove",function(e){
    if(mouseDownActivated){
        console.log(objFollow);
        var x = e.offsetX-dragDX;
        var y = e.offsetY-dragDY;
        var xy = renderDataXY(x,y,rd1);
        var coords = objFollow.coords;
        var coord = coords[objFollow.coordsidx];
        objFollowLX = xy[0];
        objFollowLY = xy[1];
    }
});




var AnimateGraph = function(graph,coords,vels,markings){

    //preparing the world based on the graph
    var circles = [];
    var edges = {};
    console.log(edges);
    for(var i = 0; i < graph.length; i++){
        var circ = world.root.createObj({
            type:"circle",
            r:2/50,
            lx:coords[i][0],
            ly:coords[i][1],
            coords:coords,
            coordsidx:i
        });
        circles[i] = circ;

        //event
        registerEvent(circ,coords,vels,i);


        var node = graph[i];
        for(var j = 0; j < node.length; j++){
            var lineId = thash(i,node[j],graph.length);
            if(!(lineId in edges)){
                var line = world.root.createObj({
                    type:"line",
                    lx:coords[i][0],
                    ly:coords[i][1],
                    lx1:coords[node[j]][0],
                    ly1:coords[node[j]][1],
                    strokeStyle:"#0002"
                });
                if(markings[i] === node[j]){//marked
                    line.strokeStyle = "#f00f";
                }
                edges[lineId] = line;
            }
        }
    }

    //var graphs = separate(graph);


    var render = function(){
        //console.log(circles);
        //console.log(edges);
        var zoom = 50;
        for(var i = 0; i < graph.length; i++){
            var node = graph[i];
            var c1 = coords[i];
            circles[i].lx = c1[0];
            circles[i].ly = c1[1];
        }
        for(var key in edges){
            var ab = tdecode(key,graph.length);
            var a = ab[0];
            var b = ab[1];
            edges[key].lx = coords[a][0];
            edges[key].ly = coords[a][1];
            edges[key].lx1 = coords[b][0];
            edges[key].ly1 = coords[b][1];
        }
        world.render(rd1);
    };

    var st = 0;

    var animate = function(t){
        if(st === 0)st = t;
        var dt = t - st;

        if(mouseDownActivated){
            coords[objFollow.coordsidx][0] = objFollowLX;
            coords[objFollow.coordsidx][1] = objFollowLY;
        }
        fdgd(graph,coords,vels);

        //render
        render();
        window.requestAnimationFrame(animate);
    };

    var start = function(){


    }

    window.requestAnimationFrame(animate);

};



var fdgd = function(graph,coords,vel){//interval 1
    //repeat this many times. Just do one iteration. Interchangeable
    for(var i = 0; i < graph.length; i++){
        if(mouseDownActivated && i === objFollow.coordsidx)continue;
        var dfx = 0;
        var dfy = 0;

        for(var j = 0; j < graph.length; j++){
            if(i !== j){
                var dx = coords[j][0]-coords[i][0];
                var dy = coords[j][1]-coords[i][1];
                var dd = (dx**2+dy**2)**0.5;
                var df = interconnectionForce(dx,dy,dd,graph.length);
                dfx += df*dx/dd;
                dfy += df*dy/dd;
            }
        }
        var node = graph[i];
        for(var j = 0; j < node.length; j++){
            if(i !== j){
                var dx = coords[node[j]][0]-coords[i][0];
                var dy = coords[node[j]][1]-coords[i][1];
                var dd = (dx**2+dy**2)**0.5;
                var df = connectionForce(dx,dy,dd,graph.length,node.length);
                dfx += df*dx/dd*5;
                dfy += df*dy/dd*5;
            }
        }
        //adding the forces from the "four walls"
        var wdist = 8;
        if(coords[i][0] < -wdist){
            dfx = Math.abs(dfx);
            //dfx += (-wdist-coords[i][0])**1;
        }else if(coords[i][0] > wdist){
            dfx = -Math.abs(dfx);
            //dfx += (wdist-coords[i][0])**1;
        }
        if(coords[i][1] < -wdist){
            dfy = Math.abs(dfy);
            //dfy += (-wdist-coords[i][1])**1;
        }else if(coords[i][1] > wdist){
            dfy = -Math.abs(dfy);
            //dfy += (wdist-coords[i][1])**1;
        }
        //dfx += -(2**(0.5*(coords[i][0]+5)))/1000000;//force from left
        //dfx += (2**(0.5*(5-coords[i][0])))/1000000;//force from right
        //dfy += -(2**(0.5*(coords[i][1]+5)))/1000000;//force from top
        //dfy += (2**(0.5*(5-coords[i][1])))/1000000;//force from bottom
        var ft = coords[i][0];//distance from right
        //console.log(dfx,dfy);
        vel[i][0] *= 0.8;
        vel[i][1] *= 0.8;
        vel[i][0] += dfx;
        vel[i][1] += dfy;
        //if(Math.abs(vel[i][0]) < 0.004)vel[i][0] = 0;
        //if(Math.abs(vel[i][1]) < 0.004)vel[i][1] = 0;
        coords[i][0] += vel[i][0];
        coords[i][1] += vel[i][1];
    }
    return true;//mutates the objects that were passed
    //normalize the coordinates
    /*
    var xsum = 0;
    var ysum = 0;
    for(var i = 0; i < coords.length; i++){
        //xsum += coords[i][0];
        //ysum += coords[i][1];
    }
    var xsum = xsum/coords.length;
    var ysum = ysum/coords.length;
    for(var i = 0; i < coords.length; i++){
        //coords[0] -= xsum;
        //coords[1] -= ysum;
    }*/
};

var interconnectionForce = function(dx,dy,dd,glen){
    //return 0;
    return -1/(dd*dd+0.01)/glen/5;
};

var connectionForce = function(dx,dy,dd,glen,nlen){
    //return 0;
    return -(1-dd)/(nlen/nlen)/50;
};



var displayGraph = function(graphdata1,markings){
    graphdata1;
    var coords1 = [];
    var vels1 = [];
    for(var i = 0; i < graphdata1.length; i++){
        coords1[i] = initrandom[i];
        vels1[i] = [0,0];
    }
    var animation = new AnimateGraph(graphdata1,coords1,vels1,markings);
    return animation;
    //animation.start();
};





