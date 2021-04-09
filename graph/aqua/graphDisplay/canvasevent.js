//require /lib/idgen.js


var Cevent = function(canvas){
    var ID = 0;
    var genId = function(){
        ID++;
        return ID;
    };

    var ctx = canvas.getContext("2d");


    //collision engines swappable
    var objs = {};//simple array





    this.addObj = function(obj){
        var id = genId();
        objs[id]

    }

}