//require ../lib/html.js

var form = new Form();
document.body.appendChild(form.elem);


var formula = form.Row("Formula: ");
var rangeL = form.Row("Higher range: ");
var rangeH = form.Row("Lower range: ");
var calc = form.Button("calculate");
var result = form.Row("Result: ");
calc.value = "";
calc.elem.addEventListener("click",function(){
    var func = eval("(x) =>  {return "+formula.value+"}");
    var min = parseFloat(rangeL.value);
    var max = parseFloat(rangeH.value);
    var sum = 0;
    for(var i = 0; i < 10000; i++){
        sum+=func(min+(max-min)/10000*i);
    }
    result.input.value = sum/10000*(max - min);
});
