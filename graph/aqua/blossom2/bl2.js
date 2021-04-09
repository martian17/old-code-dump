var NumericTable = function(){

};



//matches
//numeric hash table
/*
{
1:5
2:6
6:2
5:1
}
*/



var findAugPath = function(graph,matches){
    var forest = {};
    var nextVs = [];//stack
    var markedEs = {};
    for(var i = 0; i < grah.length; i++){
        if(graph[key].length !== 0){
            if(!matches[key]){
                forest[key] = [
                    key,//parent
                    key,//root
                    0//dist from the root
                ];
                nextVs.push(key);
            }
        }
    }
    while(nextVs.length > 0){//while there are edges to seep through
        var v = nextVs.pop();
        var cn = graph[v];
        for(var i = 0; i < cn.length; i++){
            var v1 = cn[i];
            if(!markedEs[hash2n(v,v1)]){//unmarked edges
                if(!forest[v1]){//add the edges to the forest
                    var v2 = matches[v1];
                    forest[v1] = [
                        v,//parent
                        forest[v][1],//root
                        forest[v][1]+1//dist from the root
                    ];
                    forest[v2] = [
                        v1,//parent
                        forest[v][1],//root
                        forest[v][1]+2//dist from the root
                    ];
                }else{//if v1 is in the forest
                    if(isodd(forest[v1][2])){
                        if(forest[v1][1] !== forest[v][1]){//found it!
                            //returning the path
                            var path1 = follow(forest,v);
                            var path2 = follow(forest,v1);
                            return path1.concat(path2.reverse());
                        }else{//found a blossom
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
    //var fv1 = forest[v1];
    //var fv2 = forest[v2];
    var blossom = {};
    var blossomv = 0;
    if(forest[v1][2] < forest[v2][2]){
        var temp = v1;//swap
        v1 = v2;
        v2 = temp;
    }
    while(forest[v1][2] > forest[v2][2]){
        blossom[v1] = true;
        v1 = forest[v1][0];
    }
    var cnt = 0;
    while(true){
        if(cnt > 1000){
            throw new Error("infinite loop");
        }
        if(v1 === v2){
            blossomv = v1;
            blossom[v1] = true;
            break;
        }else{
            blossom[v1] = true;
            blossom[v2] = true;
        }
        v1 = forest[v1][0];
        v2 = forest[v1][0];
    }

    //blossom searching complete
    //movig onto contraction
    var g1 = [];
    for(var i = 0; i < graph.length; i++){
        var node = graph[i];
        g1[i] = [];
        if(blossom[i])continue;
        for(var j = 0; j < node.length; j++){
            if(blossom[node[j]]){
                g1[i][j] = blossomv;
            }else{
                g1[i][j] = node[j];
            }
        }
    }
    var m1 = {};
    for(var key in matches){
        if(!blossom[key] && blossom[matches[key]]){
            m1[key] = matches[key];
        }else if(key === blossomv){//single connector
            m1[key] = matches[key];//both ways
            m1[matches[key]] = key;
        }
    }
    //
    var p1 = findAugPath(g1,m1);
    //lift the path
    var p = [];
    for(var i = 0; i < p1.length; i++){
        if(p1[i] === blossomv){
            if(iseven(i)){//blossom first
                3
            }else{//normal first

            }
        }else{
            p.push(p1[i]);
        }
    }
};

var follow = function(forest,v){
    var arr = [];
    while(forest[v][2] !== 0){
        arr.push(v);
        v = forest[v][0];
    }
    arr.push(forest[v][1]);
    return arr;
};
















var iseven = function(n){
    return (1&n)===0;
};

var isodd = function(n){
    return (1&n)===1;
};

var hash2n = function(a,b){
    return a+","+b;
};

var hash2nO = function(a,b){
    if(a>b)return a+","+b;
    return b+","+a;
};

var dehash2n = function(n){
    return n.split(",").map(a=>parseInt(a));
};
