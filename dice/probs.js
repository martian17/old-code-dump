var makearr = function(n,m){
    var a = [];
    for(var i = 0; i < n; i++){
        a[i] = m;
    }
    return a;
};

//O(m*n*n)

var probs = function(m,n){
    var arr1 = makearr(m*n,0);
    var arr2 = makearr(m*n,0);
    for(var i = 0; i < m; i++){
        arr1[i] = 1;
    }
    for(var i = 0; i < n-1; i++){
        var j = 0;
        while(true){
            var val = 0;
            for(var k = j-m; k < j+1; k++){
                if(arr1[k]){
                    val += (arr1[k] || 0);
                }
            }
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



var style = document.createElement("style");
document.body.appendChild(style);
style.innerHTML = `
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}`;

var Table = function(r,c){
    var table = document.createElement("talble");
    var rows = [];
    var tds = [];
    for(var i = 0; i < r; i++){
        var row = document.createElement("tr");
        rows[i] = row;
        tds[i] = [];
        table.appendChild(row);
        for(var j = 0; j < c; j++){
            var td = document.createElement("td");
            row.appendChild(td);
            tds[i][j] = td;

        }
    }
    this.setTopLeft = function(){
        var divWrapper = document.createElement("td");
        var line = document.createElement("div");
        line.style = "";
    }
    this.setVal = function(val,r,c){
        tds[r][c].innerHTML = val;
    }
    document.body.appendChild(table);
};







var nrow = 6;
var ncol = 100;
var table = new Table(nrow+1,ncol+1);

table.setVal("サイコロの目の数\\サイコロの数",0,0);

for(var i = 1; i < nrow+1; i++){
    table.setVal(i,i,0);
}
for(var i = 1; i < ncol+1; i++){
    table.setVal(i,0,i);
}

for(var i = 1; i < nrow+1; i++){//eyes
    for(var j = 1; j < ncol+1; j++){//number of dice
        var prob = probs(i,j);
        table.setVal(String(prob),i,j);
    }
}





