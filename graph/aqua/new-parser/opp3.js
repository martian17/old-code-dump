//require ../parser/lexebnf.js
//require ./list-op.js



class OPP{
    constructor(rules){
        this.rules = rules;
    }
    evaluate(tokens){//linked list of tokens
        var ast = listcpy(tokens);
        for(var i = 0; i < this.rules.length; i++){
            var rule = this.rules[i];
            console.log(rule);
            switch(rule.type){
                case "separator":
                this.separator(rule,ast);
                break;
                case "adjacent":
                this.adjacent(rule,ast);
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
        return this.beautify(ast);//removes all the double lists
    }
    isGroup(token){
        return token[0] === "gorup"
    }

    groupOp(func,rule,group){
        var group = group[1][1];
        while(group.length !== 0){
            if(group[0].length !== 0){
                func.bind(this)(rule,group[0]);//because dunc is independent we have to bind it
            }
            group = group[1];
        }
    }

    separator(rule,ast){//allow for empty
        //console.log(displayListRecursive(ast));
        var astroot = ast;
        var bind = [ast[0],ast[1]];//ast has to be non empty list
        var flag = false;
        var groupTail = [];
        var group = ["group", [rule.id, [bind,groupTail]]];
        while(bind.length !== 0){
            var token = bind[0];
            if(token[0] === "group"){
                this.groupOp(this.separator,rule,token);
                bind = bind[1];
            }else if(token[0] === rule.tokenName){
                flag = true;
                var newbind = bind[1];
                bind.length = 0;//setting it as the tail
                bind = newbind;
                console.log(displayListRecursive(group));
                //cutting the bind at the right length

                //adding new bind to the group
                groupTail[0] = bind;
                groupTail[1] = [];
                groupTail = groupTail[1];//groupTail
            }else{
                //do nothing
                bind = bind[1];
            }
        }

        if(flag){
            astroot[1] = [];
            astroot[0] = group;
        }
    }

    paren(rule,ast){
        var astroot = ast;
        while(ast.length !== 0){
            var token = ast[0];
            if(token[0] === "group"){
                this.groupOp(this.paren,rule,token);
            }else if(token[0] === rule.tokenNames[0]){
                var result = this.paren(rule,ast[1]);
                if(!result){
                    console.log("Error: parenthesis never closed");
                }
                ast.length = 0;
                ast[0] = result[0];//new group
                ast[1] = result[1];//the continuing ast
            }else if(token[0] === rule.tokenNames[1]){
                var newast = ast[1];
                ast.length = 0;//cutting down the end.
                //This is going to be the new tail
                return [["group",[rule.id,[astroot,[]]]],newast];
            }else{
                //do nothing
            }
            ast = ast[1];
        }
    }

    adjacent(rule,ast){
        var astroot = ast;
        var _ast;
        var __ast;
        while(ast.length !== 0){
            var token = ast[0];
            if(token[0] === "group"){
                this.groupOp(this.adjacent,rule,token);
            }else if(_ast && _ast[0][0] === rule.tokenName){
                __ast[0] = ["group",[rule.id,[[__ast[0],[]],[[ast[0],[]],[]]]]];
                __ast[1] = ast[1];
                ast = __ast;
                __ast = undefined;
                _ast = undefined;
            }else{
                //do nothing
            }
            __ast = _ast;
            _ast = ast;
            ast = ast[1];
        }
    }

    suffix(rule,ast){
        var astroot = ast;
        var _ast;
        while(ast.length !== 0){
            var token = ast[0];
            if(token[0] === "group"){
                this.groupOp(this.suffix,rule,token);
            }else if(token[0] === rule.tokenName){
                _ast[0] = ["group",[rule.id,[[_ast[0],[]],[]]]];
                _ast[1] = ast[1];
                ast = _ast;
                _ast = undefined;
            }else{
                //do nothing
            }
            _ast = ast;
            ast = ast[1];
        }
    }

    beautify(ast){
        if(Array.isArray(ast[1])){
            if(ast[1].length === 0){
                if(ast[0][0] === "group"){
                    var group = ast[0];
                    group = group[1][1];
                    while(group.length !== 0){
                        if(group[0].length === 0){//get rid of empty spaces
                            if(group[1].length === 0){
                                group.length = 0;
                            }else{
                                group[0] = group[1][0];
                                group[1] = group[1][1];
                            }
                            continue;
                        }
                        group[0] = this.beautify(group[0]);
                        group = group[1];
                    }
                }
                return ast[0];
            }else{
                var astroot = ast;
                while(ast.length !== 0){
                    ast[0] = this.beautify(ast[0]);
                    ast = ast[1];
                }
                return astroot;
            }
        }else{
            return ast;
        }
    }

};


var ebnfParser = new OPP(
    [
        {
            id:"lines",
            tokenName:"\n",
            type:"separator"
        },
        {
            id:"assignment",
            tokenName:"=",
            type:"separator",//expects two elements
        },
        {
            id:"parenthesis",
            tokenNames:["(",")"],
            type:"paren"
        },
        {
            id:"minus",
            tokenName:"-",
            type:"adjacent",
        },
        {
            id:"times",
            tokenName:"*",
            type:"suffix"
        },
        {
            id:"plus",
            tokenName:"+",
            type:"suffix"
        },
        {
            id:"question",
            tokenName:"?",
            type:"suffix"
        },
        {
            id:"and",
            tokenName:"&",
            type:"separator"
        },
        {
            id:"or",
            tokenName:"|",
            type:"separator"
        }
    ]
);


var r = ebnfParser.evaluate(arrayToList(lexEBNF(
`



adfas = adsfas | adfasd

adfa = adfa & (qwe | asdfasd - A ads - B) + | dfas


fae = afasdf & (adfs & (adfsa | dfadsf))

`
)));

console.log(displayListRecursive(r));






/*
var ebnfparser = new OPP(
    [
        {
            id:"lines",
            tokenName:"\n",
            type:"separator"
        },
        {
            id:"assignment",
            tokenName:"=",
            type:"separator",//expects two elements
        },
        {
            id:"parenthesis",
            tokenNames:["(",")"],
            type:"paren"
        },
        {
            id:"minus",
            tokenName:"-",
            type:"adjacent",
        },
        {
            id:"times",
            tokenName:"*",
            type:"suffix"
        },
        {
            id:"plus",
            tokenName:"+",
            type:"suffix"
        },
        {
            id:"question",
            tokenName:"?",
            type:"suffix"
        },
        {
            id:"and",
            tokenName:"&",
            type:"separator"
        },
        {
            id:"or",
            tokenName:"|",
            type:"separator"
        }
    ]
);*/