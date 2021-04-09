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



var randomizeArr = function(arr){
    for(var i = arr.length-1; i >= 0; i--){
        var ridx = Math.floor(Math.random()*(i+1));
        //swap ridx and i
        var a = arr[ridx];
        arr[ridx] = arr[i];
        arr[i] = a;
    }
    return arr;
};

/* test case for randomizeArr
for(var i = 0; i < 100000; i++){
var ra = randomize([0,1,2,3,4,5,6,7,8,9]);
if(ra[0] === 0){
cnt00++;
}if(ra[1] === 0){
cnt01++;
}if(ra[2] === 0){
cnt02++;
}if(ra[3] === 0){
cnt03++;
}if(ra[4] === 0){
cnt04++;
}if(ra[5] === 0){
cnt05++;
}if(ra[6] === 0){
cnt06++;
}if(ra[7] === 0){
cnt07++;
}if(ra[8] === 0){
cnt08++;
}if(ra[9] === 0){
cnt09++;
}
}
console.log(cnt00,cnt01,cnt02,cnt03,cnt04,cnt05,cnt06,cnt07,cnt08,cnt09);
*/



var range = function(n){
    var a = [];
    for(var i = 0; i < n; i++){
        a.push(i);
    }
    return a;
};