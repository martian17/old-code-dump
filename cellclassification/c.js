var makeArr = function(n,m){
    var ret = [];
    for(var i = 0; i < n; i++){
        ret.push(m);
    }
    return ret;
};
var randomArr = function(n){
    var ret = [];
    for(var i = 0; i < n; i++){
        ret.push(Math.random()>0.5?0:1);
    }
    return ret;
};

var arrcpy = function(a){
    var b = [];
    for(var i = 0; i < a.length; i++){
        b.push(a[i]);
    }
    return b;
};

var displayArr = function(a){
    var t = "[";
    for(var i = 0; i < a.length-1; i++){
        t += a[i];
        t+=" , ";
    }
    t += a[a.length-1];
    t+="]";
    console.log(t);
};

var arreq = function(a1,a2){
    for(var i = 0; i < a1.length; i++){
        if(a1[i] != a2[i]){
            return false;
        }
    }
    return true;
};


var shiftL = function(a){
    var b = a.slice(1);
    b.push(a[0]);
    return b;
};

var shiftR = function(a){
    return [a[a.length-1]].concat(a.slice(0,-1));
};

var shiftLN = function(a,n){
    for(var i = 0; i < n; i++){
        a = shiftL(a);
    }
    return a;
};

var shiftRN = function(a,n){
    for(var i = 0; i < n; i++){
        a = shiftR(a);
    }
    return a;
};

var arrsub = function(a,b){
    a = arrcpy(a);
    for(var i = 0; i < b.length; i++){
        for(var j = 0; j < a.length; j++){
            if(a[j] === b[i]){
                a.splice(j,1);
            }
        }
    }
    return a;
};


var display = function(f){
    document.body.appendChild(displayR(f));
};

var displayR = function(f){
    //document.body.innerHTML = "";
    var c = document.createElement("canvas");
    var w = f[0].length;
    var h = f.length;
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d");
    var imageData = ctx.getImageData(0,0,w,h);
    for(var i = 0; i < h; i++){
        for(var j = 0; j < w; j++){
            if(f[i][j] === 1){
                imageData.data[(i*w+j)*4 + 0] = 0;  // R value
                imageData.data[(i*w+j)*4 + 1] = 0;// G value
                imageData.data[(i*w+j)*4 + 2] = 0;  // B value
                imageData.data[(i*w+j)*4 + 3] = 255;// A value
            }else{
                imageData.data[(i*w+j)*4 + 0] = 255;  // R value
                imageData.data[(i*w+j)*4 + 1] = 255;// G value
                imageData.data[(i*w+j)*4 + 2] = 255;  // B value
                imageData.data[(i*w+j)*4 + 3] = 255;// A value
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return c;
};



var classifyAll = function(){
    var classes = {
        1:[],
        2:[],
        3:[],
        4:[],
        5:[]
    };
    for(var i = 0; i < 256; i++){
        classes[classify(i)].push(i);
    }
    return classes;
};


var cellexecute = function(r,field,itr){
    var rule = [(r&1)>>0,(r&3)>>1,(r&7)>>2,(r&15)>>3,
               (r&31)>>4,(r&63)>>5,(r&127)>>6,(r&255)>>7];
    var history = [];
    for(var i = 0; i < itr; i++){
        var nf = [];
        for(var j = 1; j < field.length-1; j++){
            pat = (field[j-1]<<2)+(field[j]<<1)+(field[j+1]<<0);
            /*if(i === 0 && pat != 0){
                console.log(pat);
                console.log(rule);
                console.log([field[j-1],field[j],field[j+1]]);
                console.log(rule[pat]);
            }*/
            nf[j] = rule[pat];
        }
        pat = (field[field.length-1]<<2)+(field[0]<<1)+(field[1]<<0);
        nf[0] = rule[pat];
        pat = (field[field.length-2]<<2)+(field[field.length-1]<<1)+(field[0]<<0);
        nf[field.length-1] = rule[pat];
        history.push(field);
        field = nf;
    }
    return history;
};






var classify = function(rule){
    var field = randomArr(500);
    field[250] = 1;
    //executes cellular automata
    var r = cellexecute(rule,field,500);

    if(arreq(r[400],r[407])){
        return 1;
    }
    for(var i = 1; i < 100; i++){
        if(arreq(r[100],r[100+i])|
           arreq(r[100],shiftLN(r[100+i],i))|
           arreq(r[100],shiftRN(r[100+i],i))|
           arreq(r[100],shiftLN(r[100+i*2],i))|
           arreq(r[100],shiftRN(r[100+i*2],i))){
            return 2;
        }
    }
    return 3;
};




var c = classifyAll();
var c34 = [18, 22, 30, 45, 54, 60, 75, 86, 89, 90, 101, 102, 105, 106, 110, 120, 122, 124, 126, 129, 135, 137, 146, 147, 149, 150, 151, 153, 161, 165, 169, 182, 183, 193, 195, 225];
var c4 = [54, 110, 124, 137, 147, 193];
var c3 = arrsub(c34,c4);
var c2 = c[2].concat(arrsub(c[3],c34)).sort(function(a,b){return a<b?-1:1});
var c1 = c[1];

c[1] = c1
c[2] = c2
c[3] = c3
c[4] = c4







var download = function(){
    for(var i = 0; i < 256; i++){
        var field = randomArr(500);
        var r = cellexecute(i,field,500);
        var c = displayR(r);
        var a = document.createElement("a");
        a.href = c.toDataURL("image/jpg");
        a.download = "Rule"+i+".jpg";
        a.click();
        console.log(i);
    }
};