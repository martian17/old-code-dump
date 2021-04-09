var lexEBNF = function(str){
    var tokens = [];
    lexEBNFKernel(str,tokens,0);
    return tokens;
};

var lexEBNFKernel = function(str,tokens,i){
    var chari = str[i];
    if(i >= str.length){
        return true;
    }
    if("=+*-&|()?".match(chari)){
        tokens.push([chari,chari]);
        lexEBNFKernel(str,tokens,++i);
        return true;
    }
    switch(chari){
        case "\"":
        parseString(str,tokens,++i,token);
        break;
    }
    return true;
};

var parseString = funciton(str,tokens,i){
    if(i === "\\"){
        i++;

    }
}




