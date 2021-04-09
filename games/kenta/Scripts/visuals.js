
// DRAWING UTILITY COMMANDS

function drawLabel(x,y,text) {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    ctx.scale(2,2); //needed as part of increasing resolution of canvas
    var radius = 5;
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.translate(0.5,0.5);
    // ctx.strokeRect(x-radius,y-radius,radius*2,radius*2);
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y-radius);
    ctx.moveTo(x+radius,y);
    ctx.lineTo(x-radius,y);
    ctx.closePath();
    ctx.stroke();
    ctx.font="10px monaco";
    ctx.lineWidth = 0.75;
    ctx.strokeText(text,x+radius+2,y-(radius+3));
    ctx.fillText(text,x+radius+2,y-(radius+3));
}

function drawHeatSignature(x,y,intensity) { //intensity ranges from 0 to 3
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    var radius = 2;
    ctx.strokeStyle = "#333333";
    if(intensity == 1) {
        ctx.strokeStyle = "#777777";
    }
    else if(intensity == 2) {
        ctx.strokeStyle = "#BBBBBB";
    }
    else if(intensity == 3) {
        ctx.strokeStyle = "#FFFFFF";
    }
    ctx.lineWidth = 2;
    ctx.strokeRect(x-radius,y-radius,radius*2,radius*2);
}