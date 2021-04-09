//require /lib/thash.js

var partialmatch = function(graph){
    //console.log(graph);
    var unusedVs = {};
    var matches = {};
    //fincs random matchings

    for(var i = 0; i < graph.length; i++){
        unusedVs[i] = true;
    }

    var v = 0;
    var m = true;
    for(var i = 0; i < graph.length; i++){
        var v1 = i;
        if(v1 in matches)continue;
        for(var j = 0; j < graph[i].length; j++){
            //var v1 = i;
            var v2 = graph[i][j];

            if(!(v1 in matches) && !(v2 in matches)){
                //register both directions
                matches[v1] = v2;
                matches[v2] = v1;
                delete unusedVs[v1];
                delete unusedVs[v2];
                break;
            }
        }
    }
    return matches;
};