class HDL{
    constructor(func){
        var funcinfo = this.getFuncInfo();
        var args = funcinfo;
        var str = func.toString();
        //operator precedance parsing
        //find assignment

    }
    getFuncInfo(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var funcstr = func.toString();
        var fnStr = funcstr.replace(STRIP_COMMENTS, '');
        var args = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(args === null)
            args = [];

        return [funcstr,args];
    }
};

var circuit = new HDL(
    (IA,IB) => {
        IA.input();
        IB.output();
        var WI16 = new wire(16);

        var IA = new wire(16).input();
        var IB = new wire(16).input();
        var WI16 = new wire(16);
        var interface = [];


        WI16.length(width-1,0);
        assign IB[0] = ~IA[0];
        assign WI16[0] = ~IA[0];
        genvar i;
        generate
        for(i = 1; i < width; i = i + 1) begin: fhquielskdwedx
            assign WI16[i] = ~IA[i] & WI16[i-1];
            assign IB[i] = (~IA[i] & WI16[i-1]) | (IA[i] & ~WI16[i-1]);
        end
        endgenerate

    }
);




