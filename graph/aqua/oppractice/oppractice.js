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

/*var arrayToList = function(arr){
    var li = null;
    for(var i = 0; i < arr; i++){
        li = [arr[i],li];
    }
}*/


var compare = function(o1,o2){
    //operator precedence table
    switch(o1[0]){
        case "id":
        switch(o2[0]){
            case "id":
            return 2;
            break;
            case "*":
            return 2;
            break;
            case "+":
            return 2;
            break;
            case "$":
            return 2;
            break;
        }
        break;
        case "*":
        switch(o2[0]){
            case "id":
            return 2;
            break;
            case "*":
            return 2;
            break;
            case "+":
            return 2;
            break;
            case "$":
            return 2;
            break;
        }
        break;
        case "+":
        switch(o2[0]){
            case "id":
            return 2;
            break;
            case "*":
            return 2;
            break;
            case "+":
            return 2;
            break;
            case "$":
            return 2;
            break;
        }
        break;
        case "$":
        switch(o2[0]){
            case "id":
            return 2;
            break;
            case "*":
            return 2;
            break;
            case "+":
            return 2;
            break;
            case "$":
            return 2;
            break;
        }
        break;
    }
};


var tokens = [["id","a"],["+","+"],["id","b"],["*","*"],["id","c"]];
var tokens = [["id","a"],["*","*"],["id","b"],["+","+"],["id","c"]];


var parse = function(tokens){
    tokens = tokensToStack(tokens);
    var s = new Stack();
    s.push(["$","$"]);
    s.push(["$","$"]);
    s.push(["$","$"]);
    for(var i = 0; i < tokens.length; i++){
        switch(compare(stack.peek(),tokens.peek())){
            case 0://push (shift)
            stack.push(tokens.pop());
            break;
            case 1://pop (reduce)
            //multi reducing
            var t3 = stack.pop();
            var t2 = stack.pop();
            var t1 = stack.pop();
            if(t1[1] === "$"){//parse error
                return false;
            }
            stack.push(["id",[t1,t2,t3]]);
            break;
            case 2://error
            return false;
            break;
        }
    }
};

var tokensToStack = function(tokens){
    var tokens1 = Stack();
    for(var i = tokens.length-1; i > -1; i++){
        tokens1.push(tokens[i]);
    }
    return tokens1;
};

