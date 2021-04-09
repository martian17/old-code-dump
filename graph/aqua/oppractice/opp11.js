//require displaytree.js

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
    }
};

var GenParser = function(precedence){
    var stackPs = [
        {},//class 0 !
        {},//class 1 ++
        {},//class 2 *
        {},//class 3 ()
        {},//class 4 \n
    ];
    var feedPs = {};
    for(var i = precedence.length-1; i > -1; i--){//from lower to higher
        var baseP = (i+1)*3;
        if(Array.isArray(precedence[i][0])){//if group
            for(var j = 0; j < precedence[i].length){
                var r = precedence[i][j];
                stackPs[r[0]][r[2]] = baseP;
                feedPs[r[2]] = baseP+(r[1]===0?-1:1);
                if(r[0] === ){

                }
                if(r[0] === 3){
                    stackPs[3][r[2]] = baseP;
                    stackPs[3][r[3]] = baseP;
                }
            }
        }else{

        }
    }
};

var parser = new GenParser(
    [
        [
            [1,0,"+"],
            [1,0,"?"],
            [1,0,"*"]
        ],
        [2,0,"-"],
        [2,1,"&"],
        [2,1,"|"],
        [2,0,"="],
        [4,0,"\n"],
        [3,0,"(",")"]
    ]
);










