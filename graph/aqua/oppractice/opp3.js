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
var genParser = function(rules){
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
    for(var i = 0; i < rules.length; i++){
        var basePrecedence = (rules.length-i+1)*3;
        var rule = rules[i];
        if(rule[2] !== 0 && rule[2] !== 1){//associativity left or right
            console.log("unexpected input in the 2nd field");
        }
        if(rule[1] !== 0 && rule[1] !== 1 && rule[1] !== 2){//feed type
            console.log("unexpected input in the 1st field");
        }
        stackRules[rule[1]][rule[0]] = basePrecedence;
        sourceRules[rule[0]] = basePrecedence+(rule[2]===0?-1:1);
        if(rule[1] === 1)stackRules[rule[1]][rule[0]] = (rules.length+2)*3;
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



var parser = new genParser(
    [
        //token, feed type, associativity, token type
        ["++",1,0,"op"],
        ["!!",0,0,"op"],
        ["!",0,0,"op"],
        ["*",2,0,"op"],
        ["+",2,0,"op"],
        ["=",2,0,"op"],
        [")",1,0,"op"],
        ["(",0,0,"op"],
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
var result = parser.parse(lex("a * ( b + ! !! c ++ * d ) + e"));
console.log(result);
displayTree(result);

