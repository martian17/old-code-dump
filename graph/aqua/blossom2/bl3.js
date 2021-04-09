
var findMatches = function(graph){

    var matches = {};
    while(true){
        var path = findAugPath(graph,matches);
        if(path){
            for(var i = 0; i < path.length; i+=2){
                matches[path[i]] = path[i+1];
                matches[path[i+1]] = path[i];
            }
        }else{
            return matches;
        }
    }
};

var findAugPath = function(graph,matches){
    //first find the root nodes
    for(var i = 0; i < graph.length; i++){
        if(i in matches){

        }
    }
}