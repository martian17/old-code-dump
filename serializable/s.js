
var parseTrans = function(trans){
    var ts = trans.split(")").map(
        function(){
            var retarr = [];
            var a = split("(");
            retarr[2] = a[1];
            var b = a[0];
            retarr[0] = b[0];
            retarr[1] = parseInt(b.slice(1));
            return retarr;
        });
    return ts;
};



var isSerializable = function(trans){
    //"r1(x)"
    trans = parseTrans(trans);
    console.log(trans);
};

isSerializable("r1(x)r2(x)r1(z)w1(x)w2(y)r3(z)w3(y)w3(z)");
































