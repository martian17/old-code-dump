//require /datastructure/priorityQueue.js

var findPath = function(g,stt,dst){
    var candids = new pq();
    candids.add([g[stt],0]);
    var finished = {};
    while(true){
        var currentPointer = candids.peek();
        var currentNode = currentPointer[0];
        for(var i = 0; i < currentNode.length; i++){
            var next = currentNode[i];
            if(contains(finished,currentNode[i])){//if past correct

            }else{//if not past create
                candids.add([g[next[0]]]);
            }
        }
    }
}