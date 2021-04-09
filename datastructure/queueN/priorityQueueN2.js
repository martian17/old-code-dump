class pq{
    constructor(){
        this.pq = [0];
    }
    add(n){
        var idx = this.pq.length;
        while(this.pq[idx>>1] < n && idx !== 1){
            this.pq[idx] = this.pq[idx>>1];
            idx = idx>>1;
        }
        this.pq[idx] = n;
    }
    peek(){
        var returnval = this.pq[1];
        var idx = 1;
        var val = this.pq[this.pq.length-1];
        var cnt = 0;
        while(true){
            cnt++;
            if(cnt > 100){
                break;
            }

            if(this.pq.length === (idx<<1)+2){//right undefined
                if(this.pq[idx<<1] > val){
                    this.pq[idx] = this.pq[idx<<1];
                    idx = idx<<1;
                }
                break;
            }else if(this.pq.length < (idx<<1)+2){//left right undefined
                break;
            }
            var l = idx<<1;
            var r = (idx<<1)+1;
            var newIndex = l;
            if(this.pq[l] < this.pq[r]){
                newIndex = r;//now l is the new index
            }
            if(val > this.pq[newIndex]){
                break;
            }
            this.pq[idx] = this.pq[newIndex];
            idx = newIndex;
        }
        this.pq[idx] = val;
        this.pq.pop();
        return returnval;
    }
};