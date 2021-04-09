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




var parseEbnf = function(tokens){
    tokens.push(["\n","\n"]);
    //separate it into lines
    var lines = [];
    var currentLine = [];
    for(var i = 0; i < tokens.length; i++){
        if(tokens[i][1] === "\n"){
            if(currentLine.length !== 0){
                lines.push(currentLine);
            }
            currentLine = [];
        }else{
            currentLine.push(tokens[i]);
        }
    }
    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        if(line[1][1] !== "="){
            console.log("Error: parse error");
            return false;
        }
        var lineStruct = ["assign",line[0],parseRightHandSide(line.slice(2))];
    }
};

var parseRightHandSide = function(tokens){
    //operator procedence parsing

    var ast = groupParen(tokens);

    //first group parenthesis
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        if(tokens[i][1] === "("){

        }else if(tokens[i][1] === "("){

        }
    }
};

var groupParen = function(tokens){
    var rootGroup = [];
    var stack = new Stack();
    stak.push(rootGroup)

    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        if(tokens[i][1] === "("){
            var group = ["paren",[]];
            stack.peek()[1].push(group);
            stack.push(group);
        }else if(tokens[i][1] === ")"){
            stack.pop();
        }else{
            stack.peek()[1].push(tokens[i]);
        }
    }


    var stack = new Stack();
    stak.push(rootGroup);
    var i = 0;
    while(true){
        var top = stack.peek();
        for(var i = 0; i < top.length; i++){

        }
    }//using stack to travere the tree and stuff


};




var Parse = funciton(){
    var and = function(arr,tokens,i){
        var resultArr = [];
        for(var j = 0; j < arr.length; j++){
            var result = arr[j]();
            resultArr.push();
        }
    }
}

and([],tokens,i);



var parseEbnf = function(tokens){
    parseEbnf
};