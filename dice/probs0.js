var makearr = function(n,m){
    var a = [];
    for(var i = 0; i < n; i++){
        a[i] = m;
    }
    return a;
};

var probs = function(m,n){
    var arr1 = makearr(m*n,0);
    var arr2 = makearr(m*n,0);
    for(var i = 0; i < m; i++){
        arr1[i] = 1;
    }
    for(var i = 0; i < n; i++){
        var j = 0;
        var cnt = 0;
        while(true){
            if(cnt > 1000){
                return false;
            }
            cnt++;
            var val = 0;
            //console.log(arr1);
            //console.log("start", m);
            //console.log();
            for(var k = j-m; k < j+1; k++){
                //console.log(k);
                //console.log(arr1[k]);
                if(arr1[k]){
                    val += (arr1[k] || 0);
                }
            }
            //console.log("end");
            console.log(val);
            if(val === 0){
                break;
            }
            arr2[j] = val;
            j++;
        }
        var tmp = arr1;//swapping
        arr1 = arr2;
        arr2 = tmp;
    }
    return arr1;
};





