//require data1.js

var separate = function(graph){
    var gs = [];
    var gi = 0;
    var visited = {};

    var traverse = function(v){
        visited[v] = gi;
        gs[gi].push(v);//adding vertices to the set
        var node = graph[v];
        for(var i = 0; i < node.length; i++){
            if(!(node[i] in visited)){//never visited
                traverse(node[i]);
            }
        }
    };

    for(var i = 0; i < graph.length; i++){
        if(!(i in visited)){
            gs[gi] = [];
            traverse(i);
            gi++;
        }
    }
    return gs;
};

var a = separate(graphdata1);
