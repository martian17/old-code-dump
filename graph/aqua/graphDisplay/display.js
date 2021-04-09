//require ../blossom/data1.js
//require ./graphtocoords.js
//require /lib/htmlgen.js

//graphdata1;


var canvas = body.add("canvas").e;
canvas.width = 500;
canvas.height = 500;

var displayGraph = function(graph){
    var coords = graphToCoords(graph);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < graph.length; i++){
        var node = graph[i];
        var c1 = coords[i];
        var x1 = c1[0]*1+canvas.width/2;
        var y1 = c1[1]*1+canvas.height/2;
        ctx.beginPath();
        ctx.arc(x1,y1,1,0,6.28);
        ctx.fill();
        ctx.closePath();
        for(var k = 0; k < node.length; k++){
            var j = node[k];
            var c2 = coords[j];
            var x2 = c2[0]*1+canvas.width/2;
            var y2 = c2[1]*1+canvas.height/2;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.strokeStyle = "#00000022";
            ctx.stroke();
            ctx.closePath();
        }
    }
    console.log(graph);
};


displayGraph(graphdata1);