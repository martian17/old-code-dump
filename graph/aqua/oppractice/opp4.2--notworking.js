//require displaytree.js

var Stack = function(){
    var stack = null;
    this.peek = function(){
        if(stack === null){
            return null;
        }
        return stack[0];
    };
    this.push = function(item){
        stack = [item,stack];
    };
    this.pop = function(){
        if(stack === null){
            return null;
        }
        var retval = stack[0];
        stack = stack[1];
        return retval;
    };
    this.display = function(){
        var a = [];
        var ts = stack;
        while(ts !== null){
            a.push(ts[0]);
            ts = ts[1]
        }
        return a;
    }
};


/*example: [
[
"op",
"*",
"2"//type
]
]*/
var genParserFromTable2 = function(table){
    this.parse = function(tokens){
        var stack = new Stack;
        var i = 1;
        while(i < table.length){
            var lookahead = tokens[i];
            var head = stack.peek();
            if(lookahead === table[i]){

            }
            stack.push();
        }
    }

};



//this stil works, but cumbersome
var parser = new genParserFromTable(
    [
        ["++","!", "*", "+", "=", ")", "("],
        [30,  24,  21,  18,  15,  30,  1  ],
        [26,  23,  20,  17,  14,  1,   1 ],
        [1,   0,   2,   2,   2,   1,   0  ]
    ]//$ and is are added later
);

var lex = function(str){
    var a = str.split(" ");
    var b = [];
    for(var i = 0; i < a.length; i++){
        if(["++","!","!!","*","+","=","(",")"].includes(a[i])){
            b.push(["op",a[i]]);
        }else{
            b.push(["id",a[i]]);
        }
    }
    return b;
}

//var result = parser.parse([["id","a"],["op","*"],["id","b"],["op","+"],["id","c"]]);
var result = parser.parse(lex("a * b + ! c ++ * d + e"));
console.log(result);
displayTree(result);

