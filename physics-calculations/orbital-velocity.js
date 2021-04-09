//require ../lib/htmlgen1.1.js


var line1 = body.add("div","radius:");
var inp1 = line1.add("input",false,"type:text;value:1737.1e+3;");

var line2 = body.add("div","mass:");
var inp2 = line2.add("input",false,"type:text;value:7.34767309e+22;");

var button = body.add("input",false,"type:button;value:go!;");

var display = body.add("div",false,false,"background-color:#eee;height:30px;");

var G = 6.67408e-11;
button.e.addEventListener("click",function(){
    var r = parseFloat(inp1.e.value);
    var m = parseFloat(inp2.e.value);
    display.e.innerHTML = Math.sqrt(G*m/r)+"m/s";
});



var note = body.add("p",`
Notes:<br>
F=GMm/r^2<br>
a=GM/r^2<br>
a=v^2/r (centripetal force)<br>
v^2=GM/r<br>
v=sqrt(GM/r)

`);