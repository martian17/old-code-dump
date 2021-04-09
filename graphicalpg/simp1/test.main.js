//require /graphicalpg/simp1/fdgdlib.js
//require data1.js

var matches0 = [
    [0,1],
    [5,2]
];

var matches = {};

for(var i = 0; i < matches0.length; i++){
    var a = matches0[i][0];
    var b = matches0[i][1];
    matches[a] = b;
    matches[b] = a;
}



displayGraph(graphdata1,matches);
