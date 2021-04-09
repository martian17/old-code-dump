var Queue = function(){
    var front = null;
    var rear = null;
    this.push = function(item){
        if(rear === null){
            rear = [item];
            front = rear;
        }else{
            var newRear = [];
            rear[1] = newRear;
            newRear[0] = item;
            rear = newRear;
        }
    };
    this.insert = function(item){
        if(front === null || !front[1]){
            this.push(item);
        }else{
            var next = front[1];
            front[1] = [item,next];
        }
    }
    this.pop = function(){
        if(front === null)return false;
        var retval = front[0];
        if(front[1]){
            front = front[1];
        }else{
            front = null;
            rear = null;
        }
        return retval;
    };
    this.peek = function(){
        if(front === null){
            return false;
        }
        return front[0];
    }
    this.empty = function(){
        if(front === null)return true;
        return false;
    }
};