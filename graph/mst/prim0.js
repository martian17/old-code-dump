//require ../graph.js

console.log(drawPath);
//require("../../priority_queue/pq.js");

//structure of graph
//[[[index,distance],[index,distance]],
// [[index,distance],[index,distance]],
// [[index,distance],[index,distance]]]

//the most naive implementation
var prim = function(graph){
    var mst = [[0]];
    var connected = {0:1};//using hash table
    while(true){
        var minedge = [0,0];
        for(var i = 0; i < mst.length; i++){
            var node = graph[i];
            //pqueue.
            //if(){
            //
            //}
        }
    }
    return mst;
};