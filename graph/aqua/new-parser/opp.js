var listcpy = function(li){
    var newli = [];
    var newend = newli;
    while(li.length !== 0){
        newend[0] = li[0];
        newend[1] = [];
        newend = newend[1];
        li = li[1];
    }
    return newli;
};

var arrayToList = function(arr){
    var li = [];
    var liend = li;
    for(var i = 0; i < arr.length; i++){
        liend[0] = arr[i];
        liend[1] = [];
        liend = liend[1];
    }
    return li;
};

var listToArray = function(li){
    var arr = [];
    while(li.length !== 0){
        arr.push(li[0]);
        li =li[1];
    }
    return arr;
};

var displayList = function(li){
    console.log(listToArray(li));
};




class OPP{
    constructor(rules){
        this.rules = rules;
    }
    evaluate(tokens){//linked list of tokens
        var ast = listcpy(tokens);
        for(var i = 0; i < this.rules; i++){
            var rule = this.rules[i];
            switch(rule.form){
                case "separator":
                this.separator(rule,ast);
                break;
                case "left":
                //this.left(rule,ast);
                break;
                case "right":
                this.right(rule,ast);
                break;
                case "suffix":
                this.suffix(rule,ast);
                break;
                case "prefix":
                //this.prefix(rule,ast);
                break;
                case "paren":
                this.paren(rule,ast);
                break;
            }
        }
    }
    groupOp(func,rule,ast){//group is an array, not list
        //0 group 1 group name
        for(var i = 2; i < ast.length; i++){
            func(rule,ast[i]);
        }
    }
    separator(rule,ast){//length 2 or more
        if(rules[0] === "group"){//a group's internal structure can be different for different format?
            this.groupOp(this.separator,rule,ast[0]);
        }
        var astroot = ast;
        var name = rule.name;
        var tokenName = rule.tokens[0];//expects only one token
        var group = ["group" separator];
        while(ast.lenght !== 0){
            var currentToken = ast[0];
            if(currentToken[0] === "group"){
                this.groupOp(this.separator,rule,ast[0]);
            }else if(currentToken[0] === tokenName){

            }
            ast = ast[1];
        }
        if(group.length >= 4){
            astroot[0] = "group";
            astroot[1] = group[1];
        }
        //do not return ast because it just modified it
    }
};



