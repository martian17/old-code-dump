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
var genParserFromTable = function(table){
    //first and second operator
    var stackRules = [
        {},
        {},
        {}
    ];
    var sourceRules = {
        "$":2,
        "id":0
    };
    var syms = table[0];
    var stackPs = table[1];
    var sourcePs = table[2];
    var feedTs = table[3];
    for(var i = 0; i < syms.length; i++){
        stackRules[feedTs[i]][syms[i]] = stackPs[i];
        sourceRules[syms[i]] = sourcePs[i];
    }
    //rules ready
    console.log(stackRules);
    console.log(sourceRules);

    this.parse = function(tokens){
        tokens.push(["$","$"]);
        var stack = new Stack();
        stack.push(["$","$"]);
        stack.push(["$","$"]);
        stack.push(tokens[0]);
        stack.push(tokens[1]);
        var i = 2;
        var cnt = 0;
        while(i < tokens.length+1){
            cnt++;
            if(cnt > 100){
                console.log("timeout");
                break;
            }
            var t3 = stack.pop();
            var t2 = stack.pop();
            var t1 = stack.pop();
            if(t1[0] === "$" && t3[0] === "$"){
                console.log(t1);
                console.log(t2);
                console.log(t3);
                stack.push(t1);
                stack.push(t2);
                stack.push(t3);
                break;
            }
            var lookahead = tokens[i];
            //reduce
            if(t1[0] === "id" && t2[0] === "op" && t3[0] === "id"
            && stackRules[2][t2[1]]){//type 2 working
                var skr = stackRules[2][t2[1]];
                var scr = sourceRules[lookahead[1]];
                if(skr > scr){
                    console.log(t1,t2,t3);
                    stack.push(["id",[t1,t2,t3]]);
                    continue;
                }
            }else if(t2[0] === "op" && t3[0] === "id"
            && stackRules[0][t2[1]]){//type 0 working
                var skr = stackRules[0][t2[1]];
                var scr = sourceRules[lookahead[1]];
                console.log("----",t2,t3,t2[1],lookahead[1]);
                if(skr > scr){
                    console.log(t2,t3);
                    stack.push(t1);
                    stack.push(["id",[t2,t3]]);
                    continue;
                }
            }else if(t2[0] === "id" && t3[0] === "op"
            && stackRules[1][t3[1]]){//type 1 not working
                var skr = stackRules[1][t3[1]];
                var scr = sourceRules[lookahead[1]];
                console.log("----",t2,t3,t3[1],lookahead[1]);
                if(skr > scr){
                    console.log(t2,t3);
                    stack.push(t1);
                    stack.push(["id",[t2,t3]]);
                    continue;
                }
            }
            //shift
            stack.push(t1);
            stack.push(t2);
            stack.push(t3);
            stack.push(lookahead);
            i++;
        }
        stack.pop();
        return stack.pop();
    };
}



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

