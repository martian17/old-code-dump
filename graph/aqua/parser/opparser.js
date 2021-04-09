class Stack{
    constructor(){
        this.arr = [];
    }
    peek(){
        return this.arr[this.arr.length-1];
    }
    pop(){
        return this.arr.pop();
    }
    push(el){
        return this.arr.push(el);
    }
};


var parseEBNF = function(tokens){
    tokens = groupParen(tokens);
    tokens = groupMinus(tokens);
    tokens = groupTimes(tokens);
    tokens = groupPlus(tokens);
    tokens = groupQuestion(tokens);
    tokens = groupAnd(tokens);
    tokens = groupOr(tokens);
};

function groupParen(tokens){//difficult to keep track of iteration, so just use bare stack
    //just using stack is easier in this case
    var i = 0;
    var newTokens = [];
    var stack = new Stack();
    stack.push(newTokens);
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        if(token[1] === "("){
            var sub = ["group","paren"];
            stack.peek().push(sub)
            stack.push(sub);
        }else if(token[1] === ")"){
            stack.pop();
        }else{
            stack.peek().push(token);
        }
    }
    if(stack.peek() === newTokens){
        return newTokens;
    }else{
        console.log("Error: Number of parenthesis don't match");
    }
}
function groupMinus(tokens){
    var i = 0;
    var newTokens = [];
    var stack = new Stack();
    stack.push(newTokens);
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        if(token[1] === "-"){
            var sub = ["group","minus"];
            stack.peek().push(sub)
            stack.push(sub);
        }else if(token[1] === "group"){
            stack.peek().push(token);
        }
    }
    if(stack.peek() === newTokens){
        return newTokens;
    }else{
        console.log("Error: Number of parenthesis don't match");
    }
}
function groupTimes(tokens){

}
function groupPlus(tokens){

}
function groupQuestion(tokens){

}
function groupAnd(tokens){

}
function groupOr(tokens){

}