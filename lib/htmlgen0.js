//make the attribute parser
//new version with updated attrlex (One pass!!!!!)

var attrlex = function(str){//全部オートマトンで書いた。やったー！！
    var i = 0;
    var state = 0;//0 first 1 second
    var ttype = 0;//0 unknown 1 space 2 string 3 name
    var tokenended = false;
    var attrs = [];
    var attr = ["",""];
    while(i < str.length){
        //console.log(i,str[i],state,ttype);
        if(ttype === 0){
            if(tokenended){
                if(state === 1){//end section
                    attrs.push(attr);
                    state = 0;
                    attr = ["",""];
                    tokenended = false;
                }
            }
            if(str[i] === " "){
                ttype = 1;
                //i++;
            }else if(str[i] === "\""){
                ttype = 2;
                i++;
            }else if(str[i] === "="){
                ttype = 0;
                state = 1;
                i++;
                tokenended = false;
            }else{//name
                ttype = 3;
            }
        }else if(ttype === 1){//space
            if(str[i] === " "){
                i++;
            }else{
                ttype = 0;
            }
        }else if(ttype === 2){//string
            if(tokenended){//did not pass "=", end section
                attrs.push(attr);
                state = 0;
                attr = ["",""];
                tokenended = false;
            }
            if(str[i] === "\\"){
                attr[state]+=str[i+1];
                i+=2;
            }else if(str[i] === "\""){
                ttype = 0;
                i++;
                tokenended = true;
            }else{
                attr[state]+=str[i];
                i++;
            }
        }else if(ttype === 3){//name
            if(tokenended){//did not pass "=", end section
                attrs.push(attr);
                state = 0;
                attr = ["",""];
                tokenended = false;
            }
            if(str[i] === "="){
                ttype = 0;
                tokenended = true;
            }else if(str[i] === " "){
                ttype = 0;
                tokenended = true;
            }else if(str[i] === "\""){
                ttype = 0;
                tokenended = true;
            }else{
                attr[state]+=str[i];
                i++;
            }
        }
    }
    if(attr[0] !== "")attrs.push(attr);
    return attrs;
};


var ELEM = function(nname,inner,attr,style){
    var e = document.createElement(nname);
    if(inner)e.innerHTML = inner;
    if(attr){
        attrlex(attr).map(at=>{
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
