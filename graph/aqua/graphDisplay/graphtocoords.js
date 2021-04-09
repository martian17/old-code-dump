//require ../blossom/data1.js

var avr = function(arr2){
    var rx = 0;
    var ry = 0;
    for(var i = 0; i < arr2.length; i++){
        rx += arr2[i][0];
        ry += arr2[i][1];
    }
    return [rx/arr2.length,ry/arr2.length];
};


var normalize = function(arr2){//gather them all to 0
    var aavr = avr(arr2);
    for(var i = 0; i < arr2.length; i++){
        arr2[i][0] -= aavr[0];
        arr2[i][1] -= aavr[1];
    }
};

var calcDist = function(dx,dy){
    return (dx**2+dy**2)**0.5;
};



var graphToCoords = function(graph){
    //assign random coordinates
    var coords = [];
    var vels = [];
    for(var i = 0; i < graph.length; i++){
        coords[i] = [Math.random(),Math.random()];
        vels[i] = [0,0];
    }
    console.log(vels);
    for(var i = 0; i < 100; i++){
        console.log(avr(coords));
        normalize(coords);
        adjustCoords(graph,coords,vels);
    }
    return coords;
};



var adjustCoords = function(graph,coords,vels){
    var ndist = 1/(graph.length**0.5);
    //when dist = ndist repulsion = 0
    for(var i = 0; i < graph.length; i++){
        var node = graph[i];
        //calculating the gravitational interaction
        for(var j = 0; j < coords.length; j++){//repulse
            if(i===j)continue;
            var dx = coords[j][0] - coords[i][0];
            var dy = coords[j][1] - coords[i][1];
            var dist = calcDist(dx,dy);
            var df = 1/(dist**2)/coords.length;//(1/(1+dist**2))**2/coords.length;
            //vels[i][0] += df*(dx/dist);
            //vels[i][1] += df*(dy/dist);
        }

        for(var j = 0; j < node.length; j++){//pull
            var dx = coords[node[j]][0] - coords[i][0];
            var dy = coords[node[j]][1] - coords[i][1];
            var dist = calcDist(dx,dy);
            var df = -1*(-(dist-1)/(1+2**(-5*(dist-2))))/coords.length;
            vels[i][0] += df*(dx/dist);
            vels[i][1] += df*(dy/dist);
        }
        coords[i][0] += vels[i][0];
        coords[i][1] += vels[i][1];
        vels[i][0] *= 0.5;
        vels[i][1] *= 0.5;//only becomes twice
    }
    //console.log(vels);
}
