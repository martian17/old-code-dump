//require /lib/stack.js
//require /lib/oddeven.js
//require /lib/thash.js
//require ./partialmatch.js
//require ./data1.js


var objcpy = function(obj){
    var obj1 = {};
    for(var key in obj){
        obj1[key] = obj[key];
    }
    return obj1;
};
var objlen = function(obj){
    return Object.keys(obj).length;
}
var arrcpy = function(arr){
    var arr1 = [];
    for(var i = 0; i < arr.length; i++){
        arr1[i] = arr[i];
    }
    return arr1;
}

var objdiff = function(o1,o2){
    var added = [];
    var subed = [];
    for(var key in o1){
        if(!(key in o2)){
            subed.push(key);
        }
    }
    for(var key in o2){
        if(!(key in o1)){
            added.push(key);
        }
    }
    return [added,subed];
};

var arrdiff = function(a1,a2){
    var o1 = {};
    for(var i = 0; i < a1.length; i++){
        o1[a1[i]] = true;
    }
    var o2 = {};
    for(var i = 0; i < a2.length; i++){
        o2[a2[i]] = true;
    }
    return objdiff(o1,o2);
};



var maxmatch = function(graph){
    //console.log(arrcpy(graph));
    var matches = partialmatch(graph);
    //console.log(matches[52])
    //console.log(matches[51])
    //console.log(matches[68])
    //for(var i = 0; i < graph.length; i++){
    //    if(!(i in matches)){
    //        console.log(i);
    //        console.log(graph[i]);
    //    }
    //}
    //console.log(objcpy(matches));
    return maxmatchK(graph,matches);
}

var cnt = 0;
var maxmatchK = function(graph,matches){
    cnt++;
    if(cnt > 10)return matches;
    //console.log(objcpy(matches),objlen(matches));
    var p = findAugPath(graph,matches);
    console.log(p);
    if(!p || p.length === 0){
        return matches;
    }else{
        for(var i = 0; i < p.length-2; i+=2){//p is even length
            //01 23 45
            removePair(matches,p[i+1],p[i+2]);
            addPair(matches,p[i],p[i+1]);
        }
        addPair(matches,p[p.length-2],p[p.length-1]);
        //console.log(p,p[p.length-2],p[p.length-1]);
        return maxmatchK(graph,matches);
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
    var glen = graph.length;
    var forest = {};
    var unprocessedv = new Stack();
    var markede = {};
    for(var i = 0; i < graph.length; i++){
        if(!(i in matches)){
            forest[i] = [i,0,i];//root, dist from root, parent idx
            unprocessedv.push(i);
        }
    }
    //console.log(objlen(forest),objcpy(forest));
    while(!unprocessedv.isempty()){
        var v = unprocessedv.pop();
        var ws = graph[v];
        for(var i = 0; i < ws.length; i++){
            var w = ws[i];
            if(!(thash(v,w,glen) in markede)){//vw set
                markede[thash(v,w,glen)] = true;//marking

                var fv = forest[v];
                if(!(w in forest)){//expanding the forest
                    forest[w] = [fv[0],fv[1]+1,v];

                    var x = matches[w];
                    forest[x] = [fv[0],fv[1]+2,w];
                }else{
                    fw = forest[w];
                    if(odd(fw[1])){
                        //went back one vertices in the same tree
                        //or is going to another tree but it's not augmenting path
                    }else if(fv[0] !== fw[0]){//found an augmenting path! report it
                        return returnPath(forest,v,w);
                    }else{//found a blossom, contract it
                        console.log("blossom!");
                        return blossomRecursion(graph,forest,v,w,matches);
                    }
                }
            }

        }
    }
    return false;
};


var returnPath = function(forest,v,w){
    //console.log(forest,v,w);
    var p = [];
    var n = v;
    var idx = forest[v][1]
    while(forest[n][1] !== 0){
        p[idx] = n;
        n = forest[n][2];
        idx--;
    }
    p[idx] = n;

    n = w;
    idx = forest[v][1]+1;
    while(forest[n][1] !== 0){
        p[idx] = n;
        n = forest[n][2];
        idx++;
    }
    p[idx] = n;
    return p;
};




var blossomRecursion = function(graph,forest,v,w,matches){
    var blossomI = findBlossom(forest,v,w,graph);
    var blossomH = blossomI[0];
    var blossomA = blossomI[1];

    var graph1len = graph.length - blossomA.length + 1;
    var omegaidx = blossomA[0];

    var graph1 = contractGraph(blossomH,graph,omegaidx);
    var matches1 = contractMatches(blossomH,matches,graph,omegaidx);
    //console.log(arrcpy(graph1));
    //console.log(objcpy(matches1));
    var p1 = findAugPath(graph1,matches1);
    //console.log(arrcpy(graph),arrcpy(graph1));
    //console.log(arrdiff(graph[140],graph1[140]));
    var lifted = liftPath(p1,blossomA,blossomH,omegaidx,graph);
    //console.log(p1,lifted);
    return lifted;
};

var findBlossom = function(forest,v,w,graph){
    var blossom = {};
    var blossomA = [];
    var passed = {};
    var n1 = v;//this is goint to be the root node
    var n2 = w;
    var broot;
    while(true){
        if(n1 in passed){
            broot = n1;
            break;
        }else if(n2 in passed){
            broot = n1;
            break;
        }
        passed[n1] = true;
        passed[n2] = true;
        n1 = forest[n1][2];//recursing back
        n2 = forest[n2][2];
    }
    //broot is the root node for rhe blossom
    blossom[broot] = true;
    n1 = v;
    blossomA.push(broot);
    var blossomA1 = [];
    while(n1 !== broot){
        blossomA1.push(n1);
        blossom[n1] = true;
        n1 = forest[n1][2];
    }
    for(var i = blossomA1.length-1; i > -1; i--){
        blossomA.push(blossomA1[i]);
    }
    n2 = w;
    while(n2 !== broot){
        blossomA.push(n2);
        blossom[n2] = true;
        n2 = forest[n2][2];
    }
    return [blossom,blossomA];
};

var contractGraph = function(blossom,graph,omegaidx){
    var graph1 = [];
    graph1[omegaidx] = [];
    for(var i = 0; i < graph.length; i++){
        if(i === omegaidx)continue;
        var n1 = [];
        graph1[i] = n1;
        if(!(i in blossom)){//keep the vertex (node)
            var n = graph[i];
            var blflag = true;
            for(var j = 0; j < n.length; j++){
                var v = n[j];
                if(v in blossom){//blossom node detected
                    if(blflag){//there could be multiple edges connecting into the blossom
                        n1.push(omegaidx);
                        graph1[omegaidx].push(i);
                        blflag = false;
                    }
                }else{
                    n1.push(v);
                }
            }
        }else{
        }//else discard the vertex
    }
    //console.log(graph1);
    return graph1;
};


var contractMatches = function(blossom,matches,graph,omegaidx){//only one edge comes out of the blossom
    var matches1 = {};
    for(var key in matches){
        if((key in blossom) & (matches[key] in blossom)){
            //ignore
        }else if(key in blossom){
            matches1[omegaidx] = matches[key];
        }else if(matches[key] in blossom){
            matches1[key] = omegaidx;
        }else{
            matches1[key] = matches[key];
        }
    }
    return matches1;
};


var liftPath = function(p1,blossomA,blossomH,omegaidx,graph){
    var p = [];
    //console.log(p1,omegaidx);
    for(var i = 0; i < p1.length; i++){
        if(p1[i] !== omegaidx){
            p.push(p1[i]);
            //console.log(p1[i]);
        }else{//blossom detected
            //contracted loop is guaranteed to be connected somewhere

            var pp1 = p1[i-1];
            var pp2 = p1[i+1];
            var ppn1 = graph[pp1];
            var ppn2 = graph[pp2];
            //console.log(p1);
            //console.log(pp1,pp2);
            //console.log(ppn1,ppn2);

            var a;
            var b;

            if(!pp1){
                a = blossomA[0];
            }else{
                for(var j = 0; j < ppn1.length; j++){
                    if(ppn1[j] in blossomH){//ppn1[j] is the starting edge
                        a = ppn1[j];
                        break;
                    }
                }
            }

            if(!pp2){
                b = blossomA[0];
            }else{
                //console.log(ppn2);
                for(var j = 0; j < ppn2.length; j++){
                    if(ppn2[j] in blossomH){//ppn1[j] is the starting edge
                        b = ppn2[j];
                        //break;
                    }
                }
            }


            var aidx,bidx;
            for(var j = 0; j < blossomA.length; j++){
                if(blossomA[j] === a){
                    aidx = j;
                }else if(blossomA[j] === b){
                    bidx = j;
                }
            }
            if(!bidx)bidx = aidx;//if a=b
            if(!aidx)aidx = bidx;

            //console.log(pp1,pp2);
            //console.log(omegaidx,blossomH);
            //console.log(a,b);
            //console.log(aidx,bidx);
            //console.log(blossomA);
            if(bidx>aidx){
                if(even(bidx-aidx)){//just loop from a to b, no problem
                    for(var j = aidx; j < bidx+1; j++){
                        p.push(blossomA[j]);
                    }
                }else{//you have to cross over from the end to the beginning
                    for(var j = aidx; j > -1; j--){
                        p.push(blossomA[j]);
                    }
                    for(var j = blossomA.length-1; j > bidx-1; j--){
                        p.push(blossomA[j]);
                    }
                }
            }else{
                if(even(bidx-aidx)){//just loop from a to b, no problem
                    for(var j = aidx; j > bidx-1; j--){
                        p.push(blossomA[j]);
                    }
                }else{//you have to cross over from the end to the beginning
                    for(var j = aidx; j < blossomA.length-1; j++){
                        p.push(blossomA[j]);
                    }
                    for(var j = 0; j < bidx+1; j++){
                        p.push(blossomA[j]);
                    }
                }
            }
        }
    }
    console.log(arrcpy(p1),arrcpy(p));
    //console.log(arrcpy(graph))
    return p;
};


var resultA = maxmatch(graphdata1);


