//require parseBool.js

var executeAST = function(ast,arr,variables){
    if(ast[0] === "id"){
        return arr[variables[ast[1]]];
    }else if(ast[0] === "&"){
        return executeAST(ast[1],arr,variables) & executeAST(ast[2],arr,variables);
    }else if(ast[0] === "|"){
        return executeAST(ast[1],arr,variables) | executeAST(ast[2],arr,variables);
    }else if(ast[0] === "!"){
        return executeAST(ast[1],arr,variables)===0?1:0;
    }else{
        console.log("error:operator not supported");
    }
};


var optimize = function(txt){
    var ast = parseBool(txt);
    var variables = {};
    var variablesA = [];
    var i = 0;
    var j = 0;
    var lexed = lex(txt);
    for(var i = 0; i < lexed.length; i++){
        if(lexed[i][0] === "id" && !(lexed[i][1] in variables)){
            variablesA.push(lexed[i][1]);
            variables[lexed[i][1]] = j;
            j++;
        }
    }

    var varlen = variablesA.length;
    //do some experiments changing variables
    var tablen = 2**varlen;
    var table = new Array(tablen);

    var result1s = [];

    for(var i = 0; i < tablen; i++){
        //do some shifting
        var tryArr = [];
        for(var j = 0; j < varlen; j++){//from 0th indexing
            tryArr[j] = i>>j&1;
        }
        var result = executeAST(ast,tryArr,variables);
        if(result === 1){
            result1s.push(tryArr);
        }
        //console.log(variables,tryArr,result);
    }
    console.log(result1s);
    //hamiltonian cycle of hypercube




};