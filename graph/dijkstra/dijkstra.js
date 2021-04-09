//require ../graph.js

//structure of graph
//[[[index,distance],[index,distance]],
// [[index,distance],[index,distance]],
// [[index,distance],[index,distance]]]



var findPath = function(graph,start,goal){
    var finished = {};
    var processing = {};

    processing[start] = [start,0,start];//id,distance,from where
    var queue = ["random",[processing[start],null]];//linked list
    while(queue[1] !== null){
        var node = queue[1][0];
        var nodeid = node[0];
        var nodedist = node[1];
        var nodeConnected = graph[node[0]];
        finished[node[0]] = node;
        if(node[0] === goal){
            break;
        }
        queue[1] = queue[1][1];
        for(var i = 0; i < nodeConnected.length; i++){//for every connected items in node
                                                      //renew the queue
            var node1id = nodeConnected[i][0];
            var node1dist = nodeConnected[i][1]+nodedist;
            if(finished[node1id]){
                continue;
            }
            if(processing[node1id]){//if in queue
                if(processing[node1id][1] < node1dist){//if trial inferior skip
                    continue;
                }
                var node1 = [node1id,node1dist,nodeid];
                processing[node1id] = node1;

                var queuepart = queue[1];
                var previous = queue;
                while(true){//insert
                    if(queuepart[0][1] > node1dist){
                        previous[1] = [processing[node1id],queuepart];
                        previous = previous[1];
                        queuepart = queuepart;
                        //console.log(previous,queuepart);
                        //console.log("deletion sequence started");
                        while(true){//delete original
                            //console.log(queuepart,previous);
                            //console.log(queuepart[0][0],node1id);
                            if(queuepart[0][0] === node1id){
                                previous[1] = queuepart[1];
                                break;
                            }
                            previous = queuepart;
                            queuepart = queuepart[1];
                        }
                        break;
                    }
                    previous = queuepart;
                    queuepart = queuepart[1];
                }
            }else{//if not in queue
                var node1 = [node1id,node1dist,nodeid];
                processing[node1id] = node1;
                var queuepart = queue[1];
                var previous = queue;
                while(true){//insert
                    if(queuepart===null || queuepart[0][1] > node1dist){
                        previous[1] = [processing[node1id],queuepart];
                        break;
                    }
                    previous = queuepart;
                    queuepart = queuepart[1];
                }
            }

        }
    }

    if(!finished[goal]){//no path was found
        return false;
    }
    //process finished into path
    var reversedPath = [goal];
    var currentId = goal;
    while(true){
        var node = finished[currentId];
        currentId = node[2];
        reversedPath.push(node[2]);
        if(currentId === start){
            break;
        }
    }
    console.log(reversedPath);
    for(var i = 0; i < reversedPath.length/2; i++){//reverse
        var mem1 = reversedPath[i];
        reversedPath[i] = reversedPath[reversedPath.length-i-1];
        reversedPath[reversedPath.length-i-1] = mem1;
    }
    console.log(reversedPath);
    return reversedPath;
};


var path = findPath(graph,leftmost,rightmost);
if(path === false){
    console.log("path finding failed");
}else{//draw the path
    drawPath(path);
}
