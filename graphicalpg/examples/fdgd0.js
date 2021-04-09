//require ./data1.js
//require /lib/htmlgen.js
//require ./disgraph.js
//require /lib/thash.js


//repel from the corners

graphdata1;
coords1;
var vels1 = [];
for(var i = 0; i < coords1.length; i++){
    vels1[i] = [0,0];
}




var AnimateGraph = function(graph,coords,vels){

    //preparing the world based on the graph
    var circles = [];
    var edges = {};
    console.log(edges);
    for(var i = 0; i < graph.length; i++){
        var circ = world.root.createObj({
            type:"circle",
            r:1,
            lx:coords[i][0],
            ly:coords[i][1]
        });
        circles[i] = circ;
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
                dfx += df*dx/dd;
                dfy += df*dy/dd;
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
        vel[i][0] *= 0.9;
        vel[i][1] *= 0.9;
        vel[i][0] += dfx;
        vel[i][1] += dfy;
        //if(Math.abs(vel[i][0]) < 0.004)vel[i][0] = 0;
        //if(Math.abs(vel[i][1]) < 0.004)vel[i][1] = 0;
        coords[i][0] += vel[i][0];
        coords[i][1] += vel[i][1];
    }
    return true;//mutates the objects that were passed
    //normalize the coordinates
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
    }
};

var interconnectionForce = function(dx,dy,dd,glen){
    //return 0;
    return -1/(dd*dd+0.01)/glen/5;
};

var connectionForce = function(dx,dy,dd,glen,nlen){
    //return 0;
    return -(1-dd)/(nlen/nlen)/50;
};





var animation = new AnimateGraph(graphdata1,coords1,vels1);
//animation.start();





