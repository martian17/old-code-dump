var df = function(fn,x){
    var dx = 0.0000001;
    return (fn(x+dx)-fn(x))/dx;
};

var dff = function(fn){
    return function(x){
        return df(fn,x);
    };
};

var findRoot = function(fn,st){
    var itr = 1000;
    var x = st;
    for(var i = 0; i < itr; i++){
        x = x - fn(x)/df(fn,x);
    }
    return x;
};

var findMin = function(fn,st){
    return findRoot(dff(fn),st);
};