//require /animate/animate.js

var transition = function(period,current){
    var ratio = current/period;
    return (1-Math.cos(current/period*3.14159265))/2;
};


var aqueue = new AnimationQueue();



var directedGraphKeyFrames = function(coords1,coords2,ratio){
    var interCoords = [];
    for(var i = 0; i < coords1.length; i++){
        interCoords[i] = [];
        interCoords[i][0] = coords1[i][0]*(1-ratio)+coords2[i][0]*ratio;
        interCoords[i][1] = coords1[i][1]*(1-ratio)+coords2[i][1]*ratio;
    }
}


var start = function(){

    aqueue.add(
        function(cut){
            var ratio = transition(1000,cut.cutt);
            var coordsnow = directedGraphKeyFrames(coords0,coords1,ratio);
            renderDire
        }
    );
}