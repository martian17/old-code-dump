//require parseNed.js
//require getTextFile.js
//require /graphicalpg/simp1/fdgdlib.js



getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_1221.ned")(function(t){
//getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_1239.ned")(function(t){
//getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_1755.ned")(function(t){
//getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_3257.ned")(function(t){
//getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_3967.ned")(function(t){
//getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_6461.ned")(function(t){


    var result = parser.parse(t);
    console.log(t);
    console.log(result);
    var submodules = result[1][4][0][4].map(
        function(e){
            return [e[0],e[4]];
        }
    );
    var connections = result[1][4][1][4].map(
        function(e){
            return [e[0],e[16],e[26]];
        }
    );
    //console.log(submodules);
    //console.log(connections);
    var nodes = result[1][4][0][4].map(
        function(e){
            return e[0];
        }
    );
    var edges = result[1][4][1][4].map(
        function(e){
            return [e[0],e[26]];
        }
    );

    var graph = nodesEdgesToGraph(nodes,edges);
    console.log(graph);

    var matches = maxmatch(graph);
    displayGraph(graph,matches);
    console.log("Maximum matching for this graph is "+matches);
});


var isEven = function(n){
    return n%2 === 0;
};

var nodesEdgesToGraph = function(nodes,edges){
    var h = {};
    var graph = [];
    for(var i = 0; i < nodes.length; i++){
        graph[i] = {};
        h[nodes[i]] = i;
    }
    for(var i = 0; i < edges.length; i++){
        graph[h[edges[i][0]]][h[edges[i][1]]] = true;
        graph[h[edges[i][1]]][h[edges[i][0]]] = true;
    }
    graph = graph.map(
        function(o){
            var ret = [];
            for(var key in o){
                ret.push(parseInt(key));
            }
            return ret;
        }
    );
    return graph;
};



var maxmatch = function(graph){
    //console.log(graph);
    var unusedVs = {};
    var matchElist = [];
    var matchEs = {};
    var matchVs = {};
    //fincs random matchings

    for(var i = 0; i < graph.length; i++){
        unusedVs[i] = true;
    }

    var v = 0;
    var m = true;
    for(var i = 0; i < graph.length; i++){
        var v1 = i;
        if(v1 in matchVs)continue;
        for(var j = 0; j < graph[i].length; j++){
            //var v1 = i;
            var v2 = graph[i][j];

            if(!(v1 in matchVs) && !(v2 in matchVs)){
                //register both directions
                matchEs[v1+","+v2] = true;
                matchEs[v2+","+v1] = true;
                matchVs[v1] = v2;
                matchVs[v2] = v1;
                delete unusedVs[v1];
                delete unusedVs[v2];
                matchElist.push([v1,v2]);
                break;
            }
        }
    }
    //console.log(matchElist);
    //console.log(matchEs);
    //console.log(matchVs);
    //console.log(graph.length);
    //console.log(matchElist.length);
    //console.log(unusedVs);
    //random matching complete

    //return matchElist.length;
    var matches = {};
    for(var i = 0; i < matchElist.length; i++){
        matches[matchElist[i][0]] = matchElist[i][1];
        matches[matchElist[i][1]] = matchElist[i][0];
    }
    return matches;
};



/*var maxmatch = function(graph){
    console.log(graph);
    var matchEs = [];
    var matchVs = {};
    //fincs random matchings

    var v = 0;
    var m = true;
    while(true){
        var vv = graph[v];
        var ff = false;
        console.log(vv);
        for(var i = 0; i < vv.length; i++){
            console.log(vv[i]);
            console.log(matchVs[vv[i]]);
            if(!matchVs[vv[i]]){
                if(m){
                    matchVs[v] = true;
                    matchVs[vv[i]] = true;
                    matchEs.push([v,vv[i]]);
                }
                v = vv[i];
                m = !m;
                //continues in while
                ff = true;
                break;
            }
        }
        if(ff)continue;
        break;
    }
    console.log(matchEs);
    console.log(matchVs);
    console.log(graph.length);
    console.log(matchEs.length);
    return matchEs.length;
};*/





