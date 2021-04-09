//require /graphicalpg/test/data1.js
//require /lib/htmlgen.js
//require ./shapesetup.js
//require ./event.js
//require /lib/thash.js




var Reversi = function(){//returns object with canvas
    var fieldArr = [];
    for(var i = 0; i < 64; i++){//64 cells
        fieldArr[i] = 0;//0: empty 1: black 2:white
    }
    //4 starting cells in th ecenter
    fieldArr[3*8+3] = 1;
    fieldArr[3*8+4] = 2;
    fieldArr[4*8+3] = 2;
    fieldArr[4*8+4] = 1;

    for(var i = 0; i < 64; i++){//64 cells
        if(fieldArr[i] !== 0){
            world.add();
        }
    }
};

body.add(reversi.canvas);