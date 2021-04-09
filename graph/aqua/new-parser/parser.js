//require ./ebnfParser.js

var isStrHead = function(str,comp){
    return str.slice(0,comp.length) === comp;
};


var loopList = function(li,callback){
    while(li.length !== 0){
        var el = li[0];
        var r = callback(el);
        if(r){
            return r;
            break;
        }
        li = li[1];
    }
    return false;
}


class Parser{
    constructor(ebnf){
        var ast = this.beautifyEBNFAST(this.reduceParenthesis(parseEbnf(ebnf)));

        this.rules = this.interpretRules(ast);
        this.rootRule = "program";
        return ast;
    }
    evaluate(str){
        this.evaluateK(str,this.rootRule);
    }
    evaluateK(str,rule){
        var funcname = rule[0];
        switch(funcname){
            case "minus":

            break;
            case "times":
            break;
            case "plus":
            break;
            case "question":
            break;
            case "and":
            var result =
            loopList(rule[1],
            (el)=>{
                var r = evaluateK(str,el);
                if(r){
                    result = r;
                    return result;//break out of the loop
                }
            });
            break;
            case "or":
            var result =
            loopList(rule[1],
            (el)=>{
                var r = evaluateK(str,el);
                if(r){
                    result = r;
                    return result;//break out of the loop
                }
            });
            if(result){
                return result;
            }else{
                return false;
            }
            break;
            case "name":
            var constant = rule[1];
            if(constant){//the name is a constant
                //another terminal

            }else{//jump to the next rule

            }
            break;
            case "string"://terminal
            var compstr = rule[1];
            if(isStrHead(str,compstr)){
                return {
                    content:list(compstr),
                    visibleContent:[]
                };
            }
            break;
        }
    }
    traverseAST(ast,callback){
        while(ast.length !== 0){

        }
    }
    interpretRules(lines){
        var rules = {};
        var flag = true;
        while(lines.length !== 0){
            var rule = lines[0];
            if(rule[0] === "assignment"){
                rule = rule[1];
                rules[rule[0][1]] = rule[1][0];
            }
            if(flag){
                this.rootRule = rule[0][1];
                flag = false;
            }
            lines = lines[1];
        }
        //console.log(rules);
        for(var key in rules){
            console.log(displayListRecursive(rules[key]));
        }
    }
    reduceParenthesis(ast){
        var astroot = ast;

        while(ast.length !== 0){
            var token = ast[0];
            if(token[0] === "group"){
                if(token[1][0] === "parenthesis"){//id for parenthesis
                    if(token[1].length === 0){
                        console.log("Error! Empty parenthesis not permitted");
                    }
                    ast[0] = this.reduceParenthesis(token[1][1][0]);
                    continue;
                }
                //["group",["and",[[content],[]]]]
                token[1][1] = this.reduceParenthesis(token[1][1]);
            }
            ast = ast[1];
        }
        return astroot;
    }
    beautifyEBNFAST(ast){
        var astroot = ast;
        if(ast[0] === "group"){
            //["group",["and",[[content],[]]]]
            ast[0] = ast[1][0];
            ast[1] = ast[1][1];

            ast = ast[1];
            while(ast.length !== 0){
                ast[0] = this.beautifyEBNFAST(ast[0]);
                ast = ast[1];
            }
        }
        return astroot;
    }
};


var p = new Parser(`
program = addition*
addition = (multiplication & "+")* & multiplication
multiplication = (number & "*")* & number
number = ("1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"0")+
`);

console.log(displayListRecursive(p));