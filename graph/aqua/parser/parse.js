class Parser{
    constructor(){
        this.rules = {};//call each other by name
    }
    addRule(){

    }
    parse(text){
        return this.rules["rootRule"](text);
    }
}

var p = new Parser();



var parseRule = function(txt){
    var pointer = 0;
    var ruleame = "";
    while(true){
        if(txt[pointer] === "="){
            pointer++;
            break;
        }
        rulename += txt[pointer];
        pointer++;
    }
    rulename = rulename.trim();
    parseRuleRight(txt.slice(pointer));
};

var parseRuleRight = function(txt){
    //switch between different types of clauses
    var r;

    r = trySEQ(txt);
    if(r)return r;

    r = tryOR(txt);
    if(r)return r;

    r = tryREP1(txt);
    if(r)return r;

    r = tryREP0(txt);
    if(r)return r;

    r = tryREP1(txt);
    if(r)return r;

    r = tryREP1(txt);
    if(r)return r;

};

//add rule functional style
p.addRule(`
root=block+
block=assignment|if|statement|comment
assignment=objectassignment|variableassignment
variableassignment="var "WS+variablename WS+ "=" WS+ statement
variablename=unicodeCharacters-
statement=functioncall|objectreference|imediatevalue
functioncall=objectreference "(" sendarguments ")"
sendarguments=(WS statement WS "," WS)+? statement



`);



var parseRoot = function(text){
    por()
};