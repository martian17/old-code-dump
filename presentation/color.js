var div = function(style,cl,inner){
    var d = document.createElement("div");
    d.style = style | "";
    d.className = cl | "";
    d.innerHTML = inner | "";
    return d;
}

var getOriginal = function(matrices){
    var matlen = matrices[0].length;
    var original = [];
    for(var i = 0; i < matlen; i++){
        original[i] = [];
        for(var j = 0; j < matlen; j++){
            original[i][j] = 0;
            for(var k = 0; k < matrices.length; k++){
                original[i][j] += matrices[k][i][j];
            }
        }
    }
    return original;
};

var createMatrixElement = function(m){
    var mlen = m[0].length;
    var mcwrapper = div("position:absolute;top:0;left:0;");
    var bracL = div("font-size:60px;",null,"(");
    var mc = div("position:absolute;top:0;left:0;font-size:15px;");
    var bracR = div("font-size:60px;",null,")");
    mcwrapper.appendChild(bracL);
    mcwrapper.appendChild(mc);
    mcwrapper.appendChild(bracR);
    for(var j = 0; j < mlen; j++){
        var mcr = div("overflow:hidden;");
        mc.appendChild(mcr);
        for(var k = 0; k < mlen; k++){
            var mcc = div("float:left;width:10px;height:10px;");
            mcr.appendChild(mcc);
            mcc.innerHTML = m[j][k];
            if(m[j][k] === 0){
                mcc.className = "zero";
            }
        }
    }
    return mcwrapper;
}

var genDemo = function(ms){
    var mlen = ms[0].length;
    var original = getOriginal(ms);
    var container = div();
    var childrenE = div("position:relative;");
    var originalE = createMatrixElement(original);
    for(var i = 0; i < ms.length; i++){
        childrenE.appendChild(createMatrixElement(ms[i]));
        console.log(createMatrixElement(ms[i]));
    }
    container.appendChild(originalE,childrenE);

    var children = childrenE.children;
    var pt = 0;
    var prog = 0;
    animateChildren1 = function(t){
        if(pt === 0)fd = 0;
        var fd = t - pt;
        for(var i = 0; i < children.length; i++){
            var c = children[i];
            c.style.top = (c.offsetWidth*prog*1.2)+"px";
            c.style.left = (c.offsetWidth*prog*1.2*i)+"px";
        }
        prog += t/1000;
        requestAnimationFrame(animateChildren1);
    };
    animateChildren1();
    document.body.appendChild(container);
    return container;
};

genDemo(
    [
        [[3, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
        [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 3, 0]],
        [[0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]
    ]
);

