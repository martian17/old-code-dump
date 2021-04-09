var simulation = function(h,v,c){
    //h:hawks
    var itr = function(){
        var h1 = 0;
        //case 1 hxh
        h1 += h*h*((v-c)/v)
        //case 2,3 hxp and pxh
        h1 += 2*h*(1-h)*1;
        //case 4 pxp
        h1 += (1-h)*(1-h)*1;
        h = h1;
    };
    for(var i = 0; i < 100; i++){
        console.log(h);
        itr();
    }
    return h;
};


simulation(0.5,10,5);