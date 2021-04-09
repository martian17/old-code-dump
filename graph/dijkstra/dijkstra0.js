var findPath = function(map, n1, n2){
    var startingPoint = [n1,0,n1];
    var inConsideration = {};//links the index and the node info
    inConsideration[n1] = startingPoint;
    //if node is not here, insert new one
    var priq = [startingPoint,null];//linear insertion
    //node, dist, previous, next priority

    var finished = {};//hash table (can improve with array)
    //no changes to finished pile
    //if finished don't bother in the search process
    //priq is going to be changed
    //queue empty

    while(priq !== null){
        //process priq[0]
        console.log(priq);
        var node = priq[0];
        finished[node[0]] = node;
        var connectedNodes = map[node[0]];
        for(var i = 0; i < connectedNodes.length; i++){
            var connectedNode = connectedNodes[i];
            var cid = connectedNode[0];
            var cdis = connectedNode[1]+node[1];
            if(typeof finished[cid] !== "undefined"){//if in the finished pile
                console.log(cid+" is finished");
                continue;
            }
            if(typeof inConsideration[cid] === "undefined"){
                //not in consideration, add new node to the queue
                console.log(cid+" is not finished and not in consideration");
                var node1 = [cid,cdis,node[0]];
                inConsideration[cid] = node1;
                var qpart = priq[1];
                var qpartBefore = priq;
                console.log(qpart);
                while(true){
                    console.log("afqregafsdfssdfg");
                    if(qpart === null||qpart[0][1] > node1[1]){
                        qpartBefore[1] = [node1,qpart];
                        break;
                    }
                    qpartBefore = qpart;
                    qpart = qpart[1];
                }
                console.log(priq,qpart);
            }else if(inConsideration[cid][1] > cdis){
                //node exists in the priority queue and the distance is larger, insert new one and find it and delete it
                var node1 = [cid,cdis,node[0]];
                inConsideration[cid] = node1;
                var qpart = priq[1];
                var qpartBefore = priq;
                var replacedFlag = false;
                while(qpart){//first stage: insert things
                    if(qpart === null||qpart[0][1] > node1[1]){
                        qpartBefore[1] = [node1,qpart];
                        //second stage: delete the original
                        while(qpart !== null){
                            var node2 = qpart[0];
                            if(node2[0] === cid){
                                qpartBefore[1] = qpart[1];
                                break;
                            }
                            qpartBefore = qpart;
                            qpart = qpart[1];
                        }
                        break;
                    }
                    qpartBefore = qpart;
                    qpart = qpart[1];
                }
            }else{
                //new consideration is inferior, no insertion or replacement
            }
        }
        priq = priq[1];
    }

    if(typeof finished[n2] === "undefined"){
        console.log("path was not found");
        return false;
    }
    var path = {};
    var node = finished[n2];
    var nextNodeId = "goal";
    while(node[0] !== n1){
        path[node[0]] = [node[0],nextNodeId];
        nextNodeId = node[0];
        node = finished[node[2]];
    }
    path[node[0]] = [node[0],nextNodeId];//the last one
    console.log(path,path[n1]);
    node = path[n1];
    var pathArray = [];
    while(node){
        console.log(node);
        pathArray.push(node[0]);
        node = path[node[1]];
    }
    return pathArray;
};
/*
priority queue: linked list
elements have to be unique


*/












var points = [];

var fieldWidth = 1000;
var fieldHeight = 500;
var numberOfPoints = 100;

for(var i = 0; i < numberOfPoints; i++){
    points[i] = [Math.random()*fieldWidth,Math.random()*fieldHeight];
}

var connectPoints = function(points,r){
    var r2 = r**2;
    var map = [];
    for(var i = 0; i < points.length; i++){//use sophisticated collision detection later
        var mapnode = [];
        map[i] = mapnode;
        for(var j = 0; j < points.length; j++){//dumby dumb dumb brute force
            if((points[i][0]-points[j][0])**2+(points[i][1]-points[j][1])**2 < r2){
                mapnode.push([j,((points[i][0]-points[j][0])**2+(points[i][1]-points[j][1])**2)**0.5]);
            }
        }
    }
    return map;
};


var renderMap = function(ctx,points,map,r){
    for(var i = 0; i < map.length; i++){
        ctx.beginPath();
        ctx.arc(points[i][0],points[i][1],r,0,6.2832);
        ctx.closePath();
        ctx.fill();
        for(var j = 0; j < map[i].length; j++){
            ctx.beginPath();
            ctx.moveTo(points[i][0],points[i][1]);
            ctx.lineTo(points[map[i][j][0]][0],points[map[i][j][0]][1]);
            ctx.closePath();
            ctx.stroke();
        }
    }
};


var canvas = document.createElement("canvas");
canvas.width = fieldWidth;
canvas.height = fieldHeight;
var ctx = canvas.getContext("2d");

document.body.innerHTML = "";
document.body.appendChild(canvas);


var map = connectPoints(points,120);
//console.log(map);
renderMap(ctx,points,map,1);
console.log("base map rendered");
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


var path = findPath(map,leftmost,rightmost);
if(path === false){
    console.log("path finding failed");
}else{//draw the path
    ctx.beginPath();
    ctx.moveTo(points[path[0]][0],points[path[0]][1]);
    for(var i = 1; i < path.length; i++){
        ctx.lineTo(points[path[i]][0],points[path[i]][1]);
    }
    //ctx.closePath();
    ctx.strokeStyle = "#f00";
    ctx.stroke();
    ctx.strokeStyle = "#000";
}





