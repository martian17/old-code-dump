
var newarr = function(n){
    var a = [];
    for(var i = 0; i < n; i++){
        a.push(0);
    }
    return a;
};

var kmeans  = function(points,n,dim){//0 to 1
    //randomly assign the points
    var centroids = [];
    var clusters = [];
    newarr(n).map(a=>{return newarr(dim).map(Math.random)});
    newarr(n).map(a=>{return []});

    for(var cnt = 0; cnt < 5; cnt++){//iterations
        for(var i = 0; i < points.length; i++){
            //calculate the closest centroid
            var mindist = Infinity;
            var idx = 0;
            for(var j = 0; j < n; j++){
                var d = dist(centroids[j],points[i]);
                if(d < mindist){
                    mindist = d;
                    idx = j;
                }
            }
            clusters[idx].push(i);
        }
        for(var i = 0; i < clusters.length; i++){
            if(clusters.length === 0){
                //cluster deleted
                centroids[i] = [1000,1000];
            }
            var avg = newarr(dim);//all 0
            for(var j = 0; j < clusters[i].length; i++){
                vectoradd(avg,clusters[i][j]);
            }
            centroids[i] = avg.map(a=>{a/clusters[i].length});
        }
    }

    return centroids,clusters;
}