var findPath = function(graph,matches){
    //detect all the empty edges in the graph
    var forest = makeForest(graph,matches);


}


var makeForest = function(graph,matches){
    var matched = {};
    for(var i = 0; i < matches.length; i++){
        matched[matches[i][0]] = true;
        matched[matches[i][1]] = true;
    }
    var unmatched = {};
    var unmarked = {};
    for(var i = 0; i < graph.length; i++){
        if(!(i in matched)){
            unmatched[i] = [];
        }else{
            unmarked[i] = true;
        }

    }

};
