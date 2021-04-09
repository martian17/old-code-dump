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

    var step = function(){
        var ndist = 1/(graph.length**0.5);
        for(var i = 0; i < graph.length; i++){
            var node = graph[i];
            //calculating the gravitational interaction
            for(var j = 0; j < coords.length; j++){//repulse
                if(i===j)continue;
                var dx = coords[j][0] - coords[i][0];
                var dy = coords[j][1] - coords[i][1];
                var dist = calcDist(dx,dy);
                var df = 1/(dist**2)/coords.length/10;//(1/(1+dist**2))**2/coords.length;
                vels[i][0] += df*(dx/dist);
                vels[i][1] += df*(dy/dist);
            }

            for(var j = 0; j < node.length; j++){//pull
                var dx = coords[node[j]][0] - coords[i][0];
                var dy = coords[node[j]][1] - coords[i][1];
                var dist = calcDist(dx,dy);
                var df = -1*((-(dist-1)/(1+2**(-5*(dist-2)))) - ((0.77/(1+(dist-1.8)**2))**2) )*2.5/100;///coords.length;
                //vels[i][0] += df*(dx/dist);
                //vels[i][1] += df*(dy/dist);
            }
            coords[i][0] += vels[i][0];
            coords[i][1] += vels[i][1];
            vels[i][0] *= 0.5;
            vels[i][1] *= 0.5;//only becomes twice
        }
    };

    var render = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i = 0; i < graph.length; i++){
            var node = graph[i];
            var c1 = coords[i];
            var x1 = c1[0]*10+canvas.width/2;
            var y1 = c1[1]*10+canvas.height/2;
            ctx.beginPath();
            ctx.arc(x1,y1,1,0,6.28);
            ctx.fill();
            ctx.closePath();
            for(var k = 0; k < node.length; k++){
                var j = node[k];
                var c2 = coords[j];
                var x2 = c2[0]*10+canvas.width/2;
                var y2 = c2[1]*10+canvas.height/2;
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

        step();
        //render
        render();
        window.requestAnimationFrame(animate);
    };

    var start = function(){


    }

    window.requestAnimationFrame(animate);

};

var animation = new AnimateGraph(graphdata1,coords1,vels1);
//animation.start();







