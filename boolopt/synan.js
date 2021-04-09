

// failed attempt at doing it all without calling internal functions


var synan = function(ast,val){
    var variables = {};
    var asroot = ast;
    var stack = new Stack();//collection of index
    var i = 0;
    while(true){
        if(i === false){//end of the loop, return
            break;
        }
        //ast is the current ast
        else if(ast[0] === "id"){
            variables[ast[1]] = true;
            //remember i, and also the ist????
            i = stack.pop()+1;

        }else if(){

        }
        stack.push(i);
    }
}