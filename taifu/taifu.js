var field = [];



var calcframe = function(field){
    for(var x = 0; x < field.length; x++){
        for(var y = 0; y < field.length; y++){
            for(var z = 0; z < field.length; z++){
                calcFrame(x,y,z);
            }
        }
    }
};

var calcFrame = function(x,y,z){
    var cell = field[x][y][z];
    //incoming particles
    //all 6 directions
    var incoming = [0,0,0];//particles,velocity,temperature,moisture
    bottomInfluence(field[x][y][z-1]);
    TopInfluence(field[x][y][z+1]);
    southInfluence(field[x][y-1][z]);
    northInfluence(field[x][y+1][z]);
    eastInfluence(field[x+1][y][z]);
    westInfluence(field[x-1][y][z]);
};

var bottomInfluence = function(){

}