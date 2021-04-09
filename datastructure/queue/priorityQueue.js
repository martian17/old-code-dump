var PQ = function(){
    var q = [[Infinity]];//use from the 1st element
    this.push = function(i,e){
        var idx = q.length;
        var i2 = idx>>1;
        while(q[i2][0] < i){
            q[idx] = q[i2];
            idx = i2;
            i2 = i2>>1;
        }
        q[idx] = [i,e];
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
        while(q[(idx<<1)+1]){
            if(q[idx<<1][0] > q[(idx<<1)+1][0] && q[idx<<1][0] > ins[0]){
                q[idx] = q[idx<<1];
                idx = idx<<1;
            }else if(q[(idx<<1)+1][0] > ins[0]){
                q[idx] = q[(idx<<1)+1];
                idx = (idx<<1)+1;
            }else{
                q[idx] = ins;
                fl = true;
                break;
            }
        }
        if(!fl){
            if(q[idx<<1] && q[idx<<1][0] > ins[0]){
                q[idx] = q[idx<<1];
                q[idx<<1] = ins;
            }else{
                q[idx] = ins;
            }
        }
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