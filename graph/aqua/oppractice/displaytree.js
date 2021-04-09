var displayTree = function(ast){
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    var ctx = canvas.getContext("2d");
    document.body.innerHTML = "";
    document.body.appendChild(canvas);
    var lp = 1;
    var iterator = function(ast,depth){
        var slen = 0;
        if(Array.isArray(ast[1])){
            ctx.strokeText(ast[0],lpnow*20,depth*30);
            var lpnow = lp;
            for(var i = 0; i < ast[1].length; i++){
                var sslen = iterator(ast[1][i],depth+1);
                ctx.moveTo(lpnow*20,depth*30);
                ctx.lineTo((lpnow+slen)*20,(depth+1)*30);
                ctx.stroke();
                slen += sslen;
            }
            return slen;
        }else{
            ctx.strokeText(ast[1],lp*20-5,depth*30+10);
            lp += ast[1].length;
            return ast[1].length;
        }
    };
    iterator(ast,0.3);
};

