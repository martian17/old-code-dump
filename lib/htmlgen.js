//make the attribute parser



var ELEM = function(nname,inner,attr,style){
    var e = document.createElement(nname);
    if(inner)e.innerHTML = inner;
    if(attr){
        var attrs = attr.split(";").map((at)=>{
            at = at.split(":");
            if(at.length !== 2)return false;
            e.setAttribute(at[0],at[1]);
        });
    }
    if(style)e.style = style;
    this.e = e;

    this.add = function(nname,inner,attr,style){
        if(typeof nname === "string"){
            var eelem = new ELEM(nname,inner,attr,style);
            this.e.appendChild(eelem.e);
            return eelem;
        }else{
            this.e.appendChild(nname.e);
            return nname;
        }
    };
    this.attr = function(a,b){
        this.e.setAttribute(a,b);
    };
};

var body = (new function(){
    this.e = document.body;
    this.add = function(nname,inner,attr,style){
        if(typeof nname === "string"){
            var eelem = new ELEM(nname,inner,attr,style);
            this.e.appendChild(eelem.e);
            return eelem;
        }else{
            this.e.appendChild(nname.e);
            return nname;
        }
    };
}());
