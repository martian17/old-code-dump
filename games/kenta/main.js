
// MAIN GAME LOOP (updated in realtime)


var drones = [];
drones.push(new drone("drone1",610,410));
drones.push(new drone("drone2",610,390));
drones.push(new drone("drone3",590,390));

var time = 0;


function introNarrative() {
    var drone1 = new drone("drone1",150.0,100.0);
    drone1.display();
    requestAnimationFrame(mainLoop);
    drawLabel(50,50,"I am a label");
    drawHeatSignature(200,300,0);
    drawHeatSignature(250,300,1);
    drawHeatSignature(300,300,2);
    drawHeatSignature(350,300,3);
    disableInput(4500);
    delayLine("recovery mode loaded!",2000);
    delayLine("<br> Prospector OS V3.7.1",3500);
    delayLine("(c) 2019, Green Horizons Firmware Corp.",4000); // 2157
}


function mainLoop() {
    time = time + 1;
    updateRightDiv();
    updateCanvas();
    drawLabel(100,100,"HERE IS SOME TEXT");
    requestAnimationFrame(mainLoop);
}


function updateCanvas() {
    updateDrones();
}


function updateDrones() {
    displayDrones();
}

function displayDrones() {
    for (var i = 0; i < drones.length; i = i + 1) {
        drones[i].display();
        //console.log("displaying drone " + drones[i].name);
    }
}

function updateRightDiv() {
    updateStatusBar();
    updateDroneWindow();
}

function updateStatusBar() {
    // update clock
    document.getElementById("time").innerHTML = "SYSTEM TIME: " + Math.trunc(time/100);
}

function updateDroneWindow() {
    //
}