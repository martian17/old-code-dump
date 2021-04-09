var matcell = function(n){
    var c = document.createElement("div");
    c.style = "width:20px;height:20px;float:left";
    c.innerHTML = n;
    return c;
}


var matrow = function(row){
    var r = document.createElement("div");
    r.style = "overflow:hidden;";
    for(var i = 0; i < row.length; i++){
        r.appendChild(matcell(row[i]));
    }
    return r;
};



var createMatrixView = function(mat){
    var matlen = mat.length;
    var m = document.createElement("div");
    m.style = "position:absolute;absoluteLeft:0px;absoluteTop:0px;";
    for(var i = 0; i < matlen; i++){
        m.appendChild(matrow(mat[i]));
    }
    return m;
};


var matcellC = function(n){
    var c = document.createElement("div");
    c.style = "width:20px;height:20px;float:left";
    if(n !== 0){
        c.innerHTML = n;
    }
    return c;
}


var matrowC = function(row){
    var r = document.createElement("div");
    r.style = "overflow:hidden;";
    for(var i = 0; i < row.length; i++){
        r.appendChild(matcellC(row[i]));
    }
    return r;
};

var createMatrixViewC = function(mat){
    var matlen = mat.length;
    var m = document.createElement("div");
    m.style = "position:absolute;absoluteLeft:0px;absoluteTop:0px;";
    for(var i = 0; i < matlen; i++){
        m.appendChild(matrowC(mat[i]));
    }
    return m;
};

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

var sigm = function(x){
    return x/Math.sqrt(x**2+1);
}

var animateChildrenFrame = function(c,cstate){
    //console.log(c,cstate);
    for(var i = 0; i < c.length; i++){
        var mwidth = c[i].offsetWidth;
        //console.log(c[i],c[i].style);
        c[i].style.left = ((mwidth*i*1.2)*sigm(cstate)) + "px";
        c[i].style.top = ((mwidth*1.3)*sigm(cstate)) + "px";
    }
    window.requestAnimationFrame(function(t){
        animateChildrenFrame(this.c,this.cstate + t/100000);
    }.bind({c:c,cstate:cstate}));
};


var startAnimation = function(children){
    animateChildrenFrame(children,0);
};



var createAnimation = function(matrices){
    var matlen = matrices[0].length;
    var original = getOriginal(matrices);

    var matbase = document.createElement("div");
    matbase.classList.add("matbase");
    var matbaseChildren = document.createElement("div");
    matbaseChildren.style = "position:relative;";
    matbase.appendChild(matbaseChildren);
    matbase.appendChild(createMatrixView(original));
    for(var i = 0; i < matrices.length; i++){
        matbaseChildren.appendChild(createMatrixViewC(matrices[i]));
    }
    document.body.appendChild(matbase);
    setTimeout(startAnimation.bind(null,matbaseChildren.children),1000)
};


createAnimation(
[
    [[3, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 3, 0]],
    [[0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]
]);

