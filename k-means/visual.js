//require k.js

var visualize = function(points){
    var clusters = kmeans(points);
    for(var i = 0; i < clusters.length; i++){
        for(var  = 0; j < clusters[i].length; j++){
            ctx.beginPath();
            ctx.arc();
        }
    }
};