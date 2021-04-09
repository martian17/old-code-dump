//require /lib/queue.js


var AnimationQueue = function(){
    var queue = new Queue();
    this.add = function(func){
        if(queue.empty())cutStart = time;
        queue.push(func);
    };
    this.interrupt = function(func){
        if(queue.empty())cutStart = time;
        queue.insert(func);
    };
    this.discard = function(){
        var current = queue.peek();
        while(queue.pop()){}//pop everything
        queue.push(current);
    };
    this.terminate = function(){
        while(queue.pop()){}//pop everything
    };
    this.pauseT = function(t){//pause for t ms
        this.add(
            function(cut){
                if(cut.cutt > t){
                    cut.end();
                }
            }
        );
    };
    this.pause = function(){
        pauseinfo.unpause = false;
        this.add(
            function(cut){
                if(pauseinfo.unpause){
                    cut.end();
                }
            }
        );
        return pauseinfo;
    };



    var cutStart = 0;
    var time = 0;
    var endCut = function(){
        queue.pop();
        cutStart = time;
    };

    var st = 0;
    var animate = function(t){
        time = t;
        if(st === 0)st = t;
        dt = t - st;
        var fn = queue.peek();
        if(fn){
            var cut = {};
            cut.cutt = t - cutStart;//time since cut started
            cut.t = t;
            cut.dt = dt;
            cut.end = endCut;
            fn(cut);
        }
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);//never ending
};


