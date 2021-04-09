var thash = function(a,b,len){
    if(a < b)return a*len+b;
    return b*len+a;
};

var tdecode = function(hash,len){
    hash = parseInt(hash);
    var a = Math.floor(hash/len);
    var b = hash-a*len;
    return [a,b];
}