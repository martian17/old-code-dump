//require /graph/aqua/main/opp.js

var parser = new GenParser(
    [
//        [
//            [1,0,"+"],
//            [1,0,"?"],
//            [1,0,"*"]
//        ],
        [0,0,"!"],
        [2,1,"&"],
        [2,1,"|"],
        [2,0,"="],
        [3,0,"(",")"]
    ]
);

var lex = function(txt){
    var i = 0;
    var tokens = [];
    var varname = "";
    while(i < txt.length){
        if("!&|=()".includes(txt[i])){
            if(varname !== ""){
                tokens.push(["id",varname]);
                varname = "";
            }
            tokens.push(["op",txt[i]]);
        }else if("\n\t\r ".includes(txt[i])){
            if(varname !== ""){
                tokens.push(["id",varname]);
                varname = "";
            }
            //do nothing
        }else{
            varname += txt[i];
        }
        i++;
    }
    if(varname !== ""){
        tokens.push(["id",varname]);
        varname = "";
    }
    return tokens;
};


var removeParen = function(ast){
    //console.log(ast);
    if(!Array.isArray(ast[1])){//nested
        return ast;
    }else if(ast[0] === "("){
        return removeParen(ast[1]);
    }else{
        for(var i = 1; i < ast.length; i++){
            ast[i] = removeParen(ast[i]);
        }
        return ast;
    }
};


var parseBool = function(txt){
    return removeParen(parser.parse(lex(txt)));
};



