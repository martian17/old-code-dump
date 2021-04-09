

//matches
//"numeric" hash table
/*
{
1:5
2:6
6:2
5:1
}
*/

var findAugPath = function(){
    var forest = {};
    var nextVs = [];//work stack
    var markedEs = {};
    for(var i = 0; i < graph.length; i++){
        if(graph[key].length !== 0){
            if(!matches[key]){
                forest[key] = [
                    key,//parent
                    key,//root
                    0
                ];
                nextVx.push(key);
            }
        }
    }
    while(nextVs.length > 0){
        var v = nextVs.pop();
        var cn = graph[v];
        for(var i = 0; i < cn.length; i++){
            var v1 = cn[i];
            if(!markedEs[hash2n(v,v1)]){//unmarked edges
                //if the forest does not contain the edge
                if(!forest[v1]){//add the edges to the forest
                    var v2 = matches[v1];
                    forest[v1] = [
                        v,//parent
                        forest[v][1],//root
                        forest[v][2]+1//dist from the root
                    ];
                    forest[v2] = [
                        v,//parent
                        forest[v][1],//root
                        forest[v][2]+2//dist from the root
                    ];
                }else{//if v1 is in the forest
                    if(isodd(forest[v1][2])){
                        if(forest[v1][1] !== forest[v1][1]){//different root, found augmenting path
                            //return the path
                            var path1 = follow(forest,v);
                            var path2 = follow(forest,v1);
                            return path1.concat(path2.reverse());
                        }else{//same tree, found a blossom
                            //contract the graph
                            return dealBlossom(graph,forest,v,v1);
                        }
                    }
                }
                markedEs[hash2n(v,v1)] = true;
                markedEs[hash2n(v1,v)] = true;
            }
        }
    }
};


var dealBlossom = function(graph,forest,v1,v2){
    var blossom = {};
    var blossomv = 0;
    var bcycle = [];
    if(forest[v1][2] < forest[v2][2]){//if one is longer, swap
        var temp = v1;
        v1 = v2;
        v2 = temp;
    }//now v1 is longer rhan v2
    while(forest[v1][2] > forest[v2][2]){
        blossom[v1] = true;
        v1 = forest[v1][0];
        bcycle.push(v1);
    };


}

























