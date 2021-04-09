//require parseNed.js
//require getTextFile.js


getTextFile("../topology/rocketfuel_ned/backbone/backbone_latencies_1221.ned")(function(t){
    var result = parser.parse(t);
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
    console.log(submodules);
    console.log(connections);
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

    var n = maxmatch(graph);
    console.log("Maximum matching for this graph is "+n);
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
    console.log(graph);
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
    console.log(matchElist);
    console.log(matchEs);
    console.log(matchVs);
    console.log(graph.length);
    console.log(matchElist.length);
    console.log(unusedVs);
    //random matching complete

    var findAugumentingPath = function(G,me,mv,mel,uu){
        var F = [];
        var unmarkedVF = {};
        var unmarkedE = {};
        var usedVF = {};
        for(var v1 = 0; v1 < graph.length; v1++){
            //unmarkedV[i] = true;
            for(var j = 0; j < graph[i].length; j++){
                var v2 = graph[v1][j];
                if(!(v1 in unmarkedE))unmarkedE[v1] = {};
                if(!(v2 in unmarkedE))unmarkedE[v2] = {};
                unmarkedE[v1][v2] = true;
                unmarkedE[v2][v1] = true;
            }
        }

        for(var i = 0; i < uu.length; i++){
            var tree ={
                root:uu[i],
                edges:[],
                nodes:{},//nodeid and dist from root
                tree:[uu[i],0,[],null]
            };
            tree.nodes[uu[i]] = tree.tree;
            F.push(tree);
            unmarkedVF[uu[i]] = tree;
            usedVF[uu[i]] = tree;
        }

        while(true){//b8
            var f1 = false;
            var f2 = false;
            var v;
            for(v in unmarkedVF){
                f1 = true;
                if(!isEven(unmarkedVF[v].nodes[v][1])){
                    f2 = true;
                    break;
                }
            }
            var tree = unmarkedVF[v];
            if(!f1)break;
            if(!f2)break;
            //v is now qualified
            while(true){//b9
                var f1 = false;
                var w;
                for(w in unmarkedE[v]){
                    f1 = true;
                    break;
                }
                if(!f1)break;
                //v, w set

                //v10
                if(!usedVF[w]){
                    // w is matched, so add e and w's matched edge to F
                    var x = mv[w];
                    usedVF[w] = tree;
                    usedVF[x] = tree;
                    tree.edges.push([v,w]);
                    tree.edges.push([w,x]);
                    var dv = tree.nodes[v][1];
                    var dw = dv+1;
                    tree.nodes[w] = [w,dw,[],tree.nodes[v]];
                    tree.nodes[v][2].push(tree.nodes[w]);
                    var dx = dw+1;
                    tree.nodes[x] = [x,dx,[],tree.nodes[w]];
                    tree.nodes[w][2].push(tree.nodes[x]);
                }else if(!isEven(usedVF[w].nodes[w][1])){//v14
                    //do nothing
                }else if(tree !== usedVF[w]){//root of v and w are different
                    // Report an augmenting path in F U { e }.
                    //connect tree and usedVF[w]

                }else{
                    // Contract a blossom in G and look for the path in the contracted

                }


                delete unmarkedE[v1][v2];
                delete unmarkedE[v2][v1];
            }
            delete unmarkedVF[v];
        }
    };

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
};*/





