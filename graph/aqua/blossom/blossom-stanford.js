var maxmatch = function(graph,matches){
    var p = findAugPath(graph,matches);
    if(!p){
        return matches;
    }else{
        for(var i = 0; i < p.length-2; i+=2){//p is even length
            //01 23 45
            addPair(matches,p[i],p[i+1]);
            removePair(matches,p[i+1],p[i+2]);
        }
        addPair(matches,p[p.length-2],p[p.length-1]);
        return maxmatch(grapa,matches);
    }
};

var addPair = function(matches,v1,v2){
    matches[v1] = v2;
    matches[v2] = v1;
};
var removePair = function(matches,v1,v2){
    delete matches[v1];
    delete matches[v2];
};


var findAugPath = function(graph,matches){
    var forest = {};
    var unprocessedv = {};
    var unprocessede = {};
    for(var i = 0; i < graph.length; i++){
        if(!(i in matches)){
            forest[i] = [i,0,null];//root, dist from root, parent idx
        }
    }
    while(){

    }

};

