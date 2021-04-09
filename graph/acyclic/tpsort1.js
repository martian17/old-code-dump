var tpsort = function(graph){
    var dins = [];
    var L = new stack();
    for(var i = 0; i < graph.length; i++){
        dins[i] = graph[i][0].length;
        if(dins[i] === 0)L.push(i);
    }
    var sorted = [];
    while(!L.empty()){
        var popped = L.pop();
        var sorted.push(popped);
        var outs = graph[popped][1];
        for(var i = 0; i < outs.length; i++){
            dins[i]--;
            if(dins[i] === 0)L.push(i);
        }
    }
    return sorted;
}