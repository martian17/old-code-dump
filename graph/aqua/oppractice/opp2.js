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
};

var parse = function(tokens){
    var rules1 = {
        "++":12,
        "!":10,
        "*":8,
        "+":6,
        "=":4,
        "$":2
    };
    var rules2 = {
        "++":11,
        "!":9,
        "*":7,
        "+":5,
        "=":3,
        "$":2
    };
    tokens.push(["$","$"]);
    var stack = new Stack();
    stack.push(["$","$"]);
    stack.push(tokens[0]);
    stack.push(tokens[1]);
    for(var i = 2; i < tokens.length; i++){
        console.log(i,stack.peek());
        var t3 = stack.pop();
        var t2 = stack.pop();
        var t1 = stack.pop();
        console.log(t1,t2,t3);
        //reduce
        if(t1[0] === "id" && t2[0] === "op" && t3[0] === "id"){//type 2
            console.log(2);
            var precedence1 = rules1[t2[1]];
            var precedence2 = rules2[tokens[i][1]];
            console.log(precedence1, precedence2);
            if(precedence1 > precedence2){
                stack.push(["id",[t1,t2,t3]]);
                console.log(stack.peek());
                i--;
                continue;
            }
        }else if(t2[0] === "op" && t3[0] === "id"){//type 0
            var precedence1 = rules1[t2[1]];
            var precedence2 = rules2[tokens[i][1]];
            if(precedence1 > precedence2){
                stack.push(t1);
                stack.push(["id",[t2,t3]]);
                i--;
                continue;
            }
        }else if(t2[0] === "id" && t3[0] === "op"){//type 1
            stack.push(t1);
            var precedence1 = rules1[t3[1]];
            var precedence2 = rules2[tokens[i][1]];
            if(precedence1 > precedence2){
                stack.push(t1);
                stack.push(["id",[t2,t3]]);
                i--;
                continue;
            }
        }else{
            //return 3;//unknown pattern
        }
        //shift
        stack.push(t1);
        stack.push(t2);
        stack.push(t3);
        stack.push(tokens[i]);
    }
    return stack.pop();
}

var result = parse([["id","a"],["op","*"],["id","b"],["op","+"],["id","c"]]);
console.log(result);

