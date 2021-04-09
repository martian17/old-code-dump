


var listcpy = function(li){
    var newli = [];
    var newend = newli;
    while(li.length !== 0){
        newend[0] = li[0];
        newend[1] = [];
        newend = newend[1];
        li = li[1];
    }
    return newli;
};

var arrayToList = function(arr){
    var li = [];
    var liend = li;
    for(var i = 0; i < arr.length; i++){
        liend[0] = arr[i];
        liend[1] = [];
        liend = liend[1];
    }
    return li;
};

var listToArray = function(li){
    var arr = [];
    while(li.length !== 0){
        arr.push(li[0]);
        li =li[1];
    }
    return arr;
};

var displayList = function(li){
    console.log(listToArray(li));
};


var displayListRecursive = function(li){
    var resultTxt = "(";
    while(li.length !== 0){
        var el = li[0];
        if(Array.isArray(el) && el.length === 2){
            resultTxt+=displayListRecursive(el)+" ";
        }else{
            resultTxt+=JSON.stringify(el)+" ";
        }

        li = li[1];
        if(!Array.isArray(li)){
            resultTxt+=". "+JSON.stringify(li);
            break;
        }
    }
    return resultTxt.trim() + ")";
}

