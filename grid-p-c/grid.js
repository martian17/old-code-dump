//require /lib/html.js

var grids = {};
var balls = [];

var gridX = 15;
var gridY = 15;
var sp = 1;


var evalGrids = function(ball){
    var xmin = Math.floor((ball.x-ball.r)/gridX);
    var xmax = Math.ceil((ball.x+ball.r)/gridX);
    var ymin = Math.floor((ball.y-ball.r)/gridY);
    var ymax = Math.ceil((ball.y+ball.r)/gridY);

    ball.grids = [];

    for(var i = xmin; i < xmax; i++){
        for(var j = ymin; j < ymax; j++){
            var gridName = i+","+(i+1)+","+j+","+(j+1);
            grids[gridName] = grids[gridName] || [];
            grids[gridName].push(ball);
            ball.grids.push(grids[gridName]);
        }
    }
};




var render = function(){
    ctx.strokeStyle = "#aff";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < balls.length; i++){
        var ball = balls[i];
        ctx.beginPath();
        ctx.arc(ball.x+canvas.width/2, canvas.height/2-ball.y, ball.r, 0, 2 * Math.PI);
        //ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
};

var vanimate = {
    start:0
};

var animate = function(t){
    if(vanimate.start === 0)vanimate.start = t;
    var interval = t - vanimate.start;
    vanimate.start = t;
    //console.log(interval);
    render();

    for(var k = 0; k < 25; k++){
        for(var key in grids){
            var grid = grids[key];
            for(var i = 0; i < grid.length; i++){
                var obj1 = grid[i];
                for(var j = i+1; j < grid.length; j++){
                    //var obj1 = grid[i];
                    var obj2 = grid[j];
                    if(obj1.collided.indexOf(obj2) !== -1){
                        continue;
                        }
                    var dx = obj1.x-obj2.x;
                    var dy = obj1.y-obj2.y;

                    var d = Math.sqrt(dx**2+dy**2);
                    var dif = obj1.r+obj2.r-d;
                    if(dif > 0){
                        //collision
                        var dx2 = dx/d*dif;
                        var dy2 = dy/d*dif;
                        obj1.x += dx2/2*sp;
                        obj1.y += dy2/2*sp;
                        obj2.x -= dx2/2*sp;
                        obj2.y -= dy2/2*sp;
                        obj1.collided.push(obj2);

                    }
                }
            }
        }
        grids = {};
        for(var i = 0; i < balls.length; i++){//collision initialization
            var obj = balls[i];
            obj.collided = [];
            obj.grids = [];
            evalGrids(obj);
        }
    }
    //setTimeout(function(){
        requestAnimationFrame(animate);
    //},0);
};


var initAnimation = function(){
    setTimeout(()=>{requestAnimationFrame(animate)},500);
};





var startSimulation = function(n,r){
    grids = {};
    gridX = 15;
    gridY = 15;
    balls = [];

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i <  n; i++){
        var ball = {
            grids:[],
            collided:[]
        };
        var area = 100;
        ball.x = Math.random()*area-area/2;
        ball.y = Math.random()*area-area/2;
        ball.r = Math.random() > 1?6:5;
        //evalGrids(ball);

        balls.push(ball);

    }

};






//creating the html

document.body.appendChild(EL("h1","Crystallization demo"));
//creating the forms
var r1 = new RowRange("cooling speed: ",0,2,0.00001,1).action(function(a){
    sp = a;
});
document.body.appendChild(r1.elem);
var r2 = new Row("N: ",500);
document.body.appendChild(r2.elem);
var disclaimer = EL("div","tip: keep N under 10000 to keep your computer from crashing, <2000 is a safe number");
document.body.appendChild(disclaimer);
var disclaimer2 = EL("div","If you like this demo, chick out some of my <a href=\"https://codepen.io/MartianLord\">other works</a>");
document.body.appendChild(disclaimer2);
var b = new Button("Start simulation").action(function(a){
    startSimulation(parseInt(r2.value),5);
});
document.body.appendChild(b.elem);
var democounter = EL("h2","Demo starts in 3");
document.body.appendChild(democounter);
setTimeout(function(){
    democounter.innerHTML = "Demo starts in 2";
},1000);
document.body.appendChild(democounter);
setTimeout(function(){
    democounter.innerHTML = "Demo starts in 1";
},2000);
document.body.appendChild(democounter);
setTimeout(function(){
    document.body.removeChild(democounter);
    b.elem.click();
},3000);

//var form = new Form;
//document.body.appendChild(r.elem);
//form.add();


var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");





requestAnimationFrame(animate);
//startSimulation(1000,5)


/*
var initAnimation = function(){
    setTimeout(()=>{requestAnimationFrame(animate)},500);
};*/

//startSimulation(2000,5);

