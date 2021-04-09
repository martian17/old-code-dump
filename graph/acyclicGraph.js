//require /lib/arrayop.js

//structure of graph
//[[[index,distance],[index,distance]],
// [[index,distance],[index,distance]],
// [[index,distance],[index,distance]]]

var dist = function(a,b){
    return ((a[0]-b[0])**2+(a[1]-b[1])**2)**0.5;
};


var points = [];

//var fieldWidth = 1000;
//var fieldHeight = 500;
//var numberOfPoints = 100;
//var connectionRadius = 120;
var fieldWidth = 500;
var fieldHeight = 500;
var numberOfPoints = 10;
var connectionRadius = 180;

for(var i = 0; i < numberOfPoints; i++){
    points[i] = [Math.random()*fieldWidth,Math.random()*fieldHeight];
}

var connectPoints = function(o_points,r){
    var graph = [];
    for(var i = 0; i < o_points.length; i++){//initializing the graph
        graph[i] = [];
    }
    var pointmap = randomizeArr(range(o_points.length));
    for(var i = 0; i < pointmap.length; i++){
        //for every past points
        for(var j = 0; j < i; j++){
            var p1 = points[pointmap[i]];
            var p2 = points[pointmap[j]];
            var dist12 = dist(p1,p2);
            if(dist12 < r){
                //if in radius add element to the graph
                graph[pointmap[i]].push([pointmap[j],dist12]);
            }
        }
    }
    return graph;
};

var vectorHeadXY = function(x,y,p1,p2,r){
    var x1 = p2[0]+(x*(p2[0]-p1[0])-y*(p2[1]-p1[1]))/r;
    var y1 = p2[1]+(x*(p2[1]-p1[1])+y*(p2[0]-p1[0]))/r;
    return [x1,y1];
};
var vectorHeadX = function(x,y,p1,p2,r){
    return p2[0]+(x*(p2[0]-p1[0])-y*(p2[1]-p1[1]))/r;
};
var vectorHeadY = function(x,y,p1,p2,r){
    return p2[1]+(x*(p2[1]-p1[1])+y*(p2[0]-p1[0]))/r;
};

var strokeArrow = function(ctx,p1,p2,dotRadius){
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
    ctx.lineTo(p2[0],p2[1]);
    ctx.closePath();
    ctx.stroke();
    var r = dist(p1,p2);
    //drawing triangle
    ctx.beginPath();
    ctx.moveTo(vectorHeadX(-dotRadius,0,p1,p2,r),vectorHeadY(-dotRadius,0,p1,p2,r));
    ctx.lineTo(vectorHeadX(-dotRadius*3,-dotRadius*0.5,p1,p2,r),vectorHeadY(-dotRadius*3,-dotRadius*0.5,p1,p2,r));
    ctx.lineTo(vectorHeadX(-dotRadius*3,dotRadius*0.5,p1,p2,r),vectorHeadY(-dotRadius*3,dotRadius*0.5,p1,p2,r));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};

var renderDirectedGraph = function(ctx,points,graph,r){
    for(var i = 0; i < graph.length; i++){//for each vertices
        ctx.beginPath();
        ctx.arc(points[i][0],points[i][1],r,0,6.2832);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.4;
        for(var j = 0; j < graph[i].length; j++){//for each edges in the vertices
            strokeArrow(ctx,points[i],points[graph[i][j][0]],r);
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
renderDirectedGraph(ctx,points,graph,5);
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





