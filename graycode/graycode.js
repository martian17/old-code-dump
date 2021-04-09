var graycode = function(n){
    var len = 1<<n;
    var a = new Array(len);
    a[0] = 0;
    for(var i = 0; i < n; i++){
        for(var j = 0; j < 1<<i; j++){
            a[(1<<i)+j] = a[(1<<i)-j-1] | 1<<i;
        }
    }
    return a;
}


var bitdecode = function(n){
    var s = "";
    for(var i = 0; i < 32; i++){
        s = String((n>>i)&1) + s;
    }
    return s;
};

console.log(graycode(2).map((n)=>{return bitdecode(n)}));