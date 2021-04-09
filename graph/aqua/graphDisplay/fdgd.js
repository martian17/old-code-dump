//require ./data1.js
//require ./graphtocoords.js
//require /lib/htmlgen.js



graphdata1;
coords1;
var vels1 = [];
for(var i = 0; i < coords1.length; i++){
    vels1[i] = [0,0];
}




var AnimateGraph = function(graph,coords,vels){

    var canvas = body.add("canvas").e;
    canvas.width = 1000;
    canvas.height = 1000;
    var ctx = canvas.getContext("2d");

    //var graphs = separate(graph);


    var render = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i = 0; i < graph.length; i++){
            var node = graph[i];
            var c1 = coords[i];
            var x1 = c1[0]*50+canvas.width/2;
            var y1 = c1[1]*50+canvas.height/2;
            ctx.beginPath();
            ctx.arc(x1,y1,1,0,6.28);
            ctx.fill();
            ctx.closePath();
            for(var k = 0; k < node.length; k++){
                var j = node[k];
                var c2 = coords[j];
                var x2 = c2[0]*50+canvas.width/2;
                var y2 = c2[1]*50+canvas.height/2;
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.strokeStyle = "#00000022";
                ctx.stroke();
                ctx.closePath();
            }
        }
    };

    var st = 0;

    var animate = function(t){
        if(st === 0)st = t;
        var dt = t - st;

        for(var i = 0; i < gs.length; i++){
            fdgd(gs[i],cs[i],vs[i]);
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
        //console.log(dfx,dfy);
        vel[i][0] *= 0.90;
        vel[i][1] *= 0.90;
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
        xsum += coords[i][0]
        ysum += coords[i][1]
    }
    var xsum = xsum/coords.length;
    var ysum = ysum/coords.length;
    for(var i = 0; i < coords.length; i++){
        coords[0] -= xsum;
        coords[1] -= ysum;
    }
};

var interconnectionForce = function(dx,dy,dd,glen){
    //return 0;
    return -1/(dd*dd+0.1)/glen/5;
};

var connectionForce = function(dx,dy,dd,glen,nlen){
    //return 0;
    return -(1-dd)/(nlen/nlen)/50;
};





var animation = new AnimateGraph(graphdata1,coords1,vels1);
//animation.start();





