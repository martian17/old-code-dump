//structure of graph
//[[[index,distance],[index,distance]],
// [[index,distance],[index,distance]],
// [[index,distance],[index,distance]]]

var points = [];

//var fieldWidth = 1000;
//var fieldHeight = 500;
//var numberOfPoints = 100;
//var connectionRadius = 120;
var fieldWidth = 500;
var fieldHeight = 500;
var numberOfPoints = 12;
var connectionRadius = 180;

for(var i = 0; i < numberOfPoints; i++){
    points[i] = [Math.random()*fieldWidth,Math.random()*fieldHeight];
}

var connectPoints = function(points,r){
    var r2 = r**2;
    var graph = [];
    for(var i = 0; i < points.length; i++){//use sophisticated collision detection later
        var graphnode = [];
        graph[i] = graphnode;
        for(var j = 0; j < points.length; j++){//dumby dumb dumb brute force
            if((points[i][0]-points[j][0])**2+(points[i][1]-points[j][1])**2 < r2 && i !== j){
                graphnode.push([j,((points[i][0]-points[j][0])**2+(points[i][1]-points[j][1])**2)**0.5]);
            }
        }
    }
    return graph;
};


var renderGraph = function(ctx,points,graph,r){
    for(var i = 0; i < graph.length; i++){
        ctx.beginPath();
        ctx.arc(points[i][0],points[i][1],r,0,6.2832);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.1;
        for(var j = 0; j < graph[i].length; j++){
            ctx.beginPath();
            ctx.moveTo(points[i][0],points[i][1]);
            ctx.lineTo(points[graph[i][j][0]][0],points[graph[i][j][0]][1]);
            ctx.closePath();
            ctx.stroke();
        }
    }
};


var canvas = document.createElement("canvas");
canvas.width = fieldWidth;
canvas.height = fieldHeight;
var ctx = canvas.getContext("2d");

//document.body.innerHTML = "";
document.body.appendChild(canvas);


var graph = connectPoints(points,connectionRadius);
//console.log(graph);
renderGraph(ctx,points,graph,5);
console.log("base graph rendered");
//path finding

//farthest left right
var leftmost = 0;
var rightmost = 0;

for(var i = 1; i < points.length; i++){
    if(points[i][0] < points[leftmost][0]){
        leftmost = i;
    }
    if(points[i][0] > points[rightmost][0]){
        rightmost = i;
    }
}


var drawPath = function(path){
    ctx.beginPath();
    ctx.setLineDash([1, 3]);
    ctx.lineWidth = 1;
    ctx.moveTo(points[path[0]][0],points[path[0]][1]);
    for(var i = 1; i < path.length; i++){
        ctx.lineTo(points[path[i]][0],points[path[i]][1]);
    }
    //ctx.closePath();
    ctx.strokeStyle = "#f00";
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#000";
};





/*
ctx.clearRect(0,0,500,500);
renderGraph(ctx,points,graph,1);
*/
