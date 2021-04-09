/*var nnn = function(n){//in number

    for(var i = 0; i < n.length; i++){

    }
};*/



//len = 4
/*
0000

0001
0010
0100
1000

//101010
//110100
//011001
//000111


//101010
//110100
//011001
//000111

01100110011001100110011001100110
00111100001111000011110000111100
00001111111100000000111111110000
00000000111111111111111100000000
00000000000000001111111111111111
01212321234323212343454323432321
0123456789abcdefghijklmnopqrstuv

n =

0121412181214121g121412181214121

01010101010101010101010101010101
01230123012301230123012301230123
01234567012345670123456701234567
0123456789abcdef0123456789abcdef
0123456789abcdefghijklmnopqrstuv

05832dafs
05332

0101010101010101
0011001100110011
000111000111000
0000111100001111

0011
0110
0101
1010
1001
1100

0111
1011
1101
1110

1111
*/


/*

0011
0110
1100
0101
1010
1001
*/
/*
1
11
121
1331
14641

*/

var nn = function(len,n){//len->length n->nth n code

}


var nna = function(n){//in number
    var a = new Array(1<<n);
    a[0] = new Array(n);

    var idx = 0;
    var lplace = function(pos,rem){
        console.log(pos,rem);
        var item = a[idx];
        if(rem === 0){//item complete
            for(var j = n; j < i; j++){
                item[j] = 0;
            }
            if(idx < 1<<n){

            }
            idx++;
            a[idx] = new Array(n);
        }else{
            for(var i = pos; i < n-rem+1; i++){//+1 because want to loop all the places
                for(var j = pos; j < i; j++){
                    item[j] = 0;
                }
                item[i] = 1;
                lplace(i+1,rem-1);
            }
        }
    };
    for(var i = 0; i < n+1; i++){//operate on arry
        lplace(0,i);
    }
    return a;
};


var nna1 = function(n){//in number
    var a = new Array(1<<n);
    for(var i = 0; i < (i<<n); i++){
        a[i] = new Array(n);
    }


    var idx = 0;
    var loopCond = function(pos,rem){//position, remaining characters
        if(rem === 0){
            for(var i = pos; i < n; i++){
                a[idx][pos] = i;
            }
        }
    }


    var lplace = function(pos,rem){
        console.log(pos,rem);
        var item = a[idx];
        if(rem === 0){//item complete
            for(var j = n; j < i; j++){
                item[j] = 0;
            }
            if(idx < 1<<n){

            }
            idx++;
            a[idx] = new Array(n);
        }else{
            for(var i = pos; i < n-rem+1; i++){//+1 because want to loop all the places
                for(var j = pos; j < i; j++){
                    item[j] = 0;
                }
                item[i] = 1;
                lplace(i+1,rem-1);
            }
        }
    };
    for(var i = 0; i < n+1; i++){//operate on arry
        lplace(0,i);
    }
    return a;
};