var PQ = function(){
    var q = [[Infinity]];//use from the 1st element
    this.push = function(i,v){//index and value
        var idx = q.length;
        while(q[idx>>1][0] < i){//if parent node has bigger value, stop propagating
            q[idx] = q[idx>>1];
            idx = idx>>1;
        }
        q[idx] = [i,v];
    };
    this.peek = function(){
        if(q.length === 1){
            return false;
        }
        return q[1];
    };
    this.show = function(){
        console.log(q);
    };
    this.pop = function(){
        if(q.length === 1){
            return false;
        }
        var ret = q[1];
        var ins = q[q.length-1];
        var idx = 1;
        var fl = false;

        while((idx<<1)+1 < q.length){//if either one of two children are undefined, stop propagating
            var nidx = (idx<<1)+1;
            if(q[idx<<1][0] > q[(idx<<1)+1][0]){//selecting the bigger one from two children
                nidx = idx<<1;
            }
            if(ins[0] > q[nidx][0]){//if nigger child is smaller than the inserted value, stop.
                //current idx will be the idx for the child
                fl = true;
                break;
            }
            q[idx] = q[nidx];//replaced node propagates up
            idx = nidx;
        }
        if(!fl){//if unfinished
            if(idx<<1 === q.length-1 && q[idx<<1][0] > ins[0]){
                //if first child is larger, replace and make idx twice
                q[idx] = q[idx<<1];
                idx = idx<<1;
            }
        }
        //insert into q[idx]
        q[idx] = ins;
        q.pop();
        return ret;
    };
};

var q = new PQ();
q.push(3,1);
q.push(1,1);
q.push(4,1);
q.push(1,1);
q.push(5,1);
q.push(9,1);
q.push(2,1);


var a = [];
while(q.peek()){
    a.push(q.pop());
}
console.log(a);
console.log(q.peek());