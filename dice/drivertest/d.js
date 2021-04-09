var probC = function(n, r){
var sum = 1
for(var i = 0; i < r; i++){
sum = sum * (n - i) / (i+1);
}
return sum;
};

var t = 0;
for(var i = 0; i < 60; i++){
t += probC(100,i);
}
console.log(t/2**100);



var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");


for(var i = 0; i < 1000; i++){
    var prob = probC(1000,i)/(2**1000);
    console.log(prob);
    var height = Math.log(prob)+500
    //ctx.fillRect(i*5,500-height,5,height);
    ctx.fillRect(i,500-height,1,height);
}


