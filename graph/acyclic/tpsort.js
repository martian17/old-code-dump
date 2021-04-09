//require ../acyclicGraph.js

//structure of graph
//[[[index,distance],[index,distance]],
// [[index,distance],[index,distance]],
// [[index,distance],[index,distance]]]

var tpsort = function(graph){
    var graph1 = [];
    for(var i = 0; i < graph.length; i++){
        graph1.push([[],graph[i][0]]);//in and out
    }
    for(var i = 0; i < graph.length; i++){
        var outs = graph1[i][1];
        for(var j = 0; j < outs.length; j++){
            graph1[outs[j]][0].push(i);//pushing to ins
        }
    }
    graph = graph1;
    //initialization complete

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