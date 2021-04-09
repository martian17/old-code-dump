//require ../lib/htmlgen1.1.js


var line1 = body.add("div","distance:");
var inp1 = line1.add("input",false,"type:text;value:600e+3;");

var line2 = body.add("div","final velocity:");
var inp2 = line2.add("input",false,"type:text;value:8e+3");

var button = body.add("input",false,"type:button;value:go!;");

var display = body.add("div",false,false,"background-color:#eee;height:30px;");

var G = 6.67408e-11;
button.e.addEventListener("click",function(){
    var x = parseFloat(inp1.e.value);
    var v = parseFloat(inp2.e.value);
    var a = v*v/(2*x)
    display.e.innerHTML = "aceleration: "+a+"m/s/s<br>"+
    "t: "+Math.sqrt(2*a*x)/a+"s";
});



var note = body.add("p",`
Notes:<br>
x1=1/2at1^2<br>
t1=sqrt(2ax1)/a<br>
v1=at1=asqrt(2ax1)/a=sqrt(2ax1)<br>
v1^2=2ax1<br>
a=v1^2/(2x1)
`);