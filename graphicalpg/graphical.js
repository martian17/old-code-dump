var canvas = document.createElement("canvas");


class GF{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.objs = [];
    }
    render(){
        var ctx = this.ctx;

        ctx.clearRect(0,0,width,height);

        for(var i = 0; i < this.objs.length; i++){
            var obj = this.objs[i];
            switch(obj.type){
                case "cell"
                drawcell(obj);
            }
        }
    }
    drawcell(obj){
        var ctx = this.ctx;
        var canvas = this.canvas;
        var width = canvas.width;
        var height = canvas.height;
        ctx.strokeStyle = obj.strokeStyle;
        ctx.fillStyle = obj.fillStyle;
        obj.x = obj.parent.x + obj.lx;
        ctx.rect(obj.x,obj.y,obj.w,obj.h);
        ctx.stroke();
        ctx.fill();

    }
    moveObj(){

    }

}