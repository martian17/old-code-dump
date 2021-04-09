
// CLASSES


var maxDroneRange = 30;

class drone {
    constructor(iName,iX,iY) {
        this.name = iName;
        this.speed = 5.0;
        this.moveCoordX = 0.0;
        this.moveCoordY = 0.0;
        this.carrying = false;
        this.x = iX * 1.0; // float value, but is rounded for display/ game purposes
        this.y = iY * 1.0;
        this.harvestMode = false; //whether or not the drone is in automatic harvest mode
    }
    display() {
        drawLabel(this.x,this.y,this.name);
    }
    executeInput(action,param1,param2,param3) {
        if(action == "move") {
            this.harvestMode = false;
            this.setCoords(param1,param2);
        }
        else if(action == "harvest") {
            harvestMode = true;
        }
        // etc etc
    }

    setCoords(x,y) { // sets target coordinates. This ensures that the drone has a consistent movement target
        if(Math.sqrt((x^2)+(y^2)) <= maxDroneRange) {
            moveCoordX = x;
            moveCoordY = y;
            addLine("destination of ["+name+"] set to ["+x+","+y+"]");
        }
        else {
            addLine("ERROR: target coordinates outside current drone control range");
        }
    }
    setCoordsAuto(x,y) { // sets target coordinates without printing to console
        if(Math.sqrt((x^2)+(y^2)) <= maxDroneRange) {
            moveCoordX = x;
            moveCoordY = y;
        }
    }
    move() { // moves towards current target location
        var displacementX = this.moveCoordX - this.xPos;
        var displacementY = this.moveCoordY - this.yPos;
        var hypotenuse = Math.sqrt((displacementX^2) + (displacementY^2));
        //displacementX = displacemMath.sqrt((displacementX^2) + (displacementY^2)))
        x = x + (displacementX*speed);
        y = y + (displacementY*speed);
    }
    harvest() {
        /* if carrying, go to nearest base. if arrived, unload.
        if not carrying, go to nearest deposit. if arrived, load. */
    }
}






class resourceDeposit {
    constructor(x,y, amount) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.depleted = false;
        if(this.amount<0) {
            this.depleted = true;
        }
    }
    display() {
        drawLabel(this.x,this.y,"RS["+this.amount+"]");
    }
    takeResource() {
        this.amount = this.amount - 1;
        if(this.amount < 1) {
            //make resource invalid
        }
    }
}