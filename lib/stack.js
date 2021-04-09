var Stack = function(){
    var stack = null;
    this.peek = function(){
        if(stack === null){
            return null;
        }
        return stack[0];
    };
    this.push = function(item){
        stack = [item,stack];
    };
    this.pop = function(){
        if(stack === null){
            return null;
        }
        var retval = stack[0];
        stack = stack[1];
        return retval;
    };
    this.display = function(){
        var a = [];
        var ts = stack;
        while(ts !== null){
            a.push(ts[0]);
            ts = ts[1]
        }
        return a;
    };
    this.isempty = function(){
        if(stack === null){
            return true;
        }
        return false;
    }
};