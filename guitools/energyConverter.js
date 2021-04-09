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

var genSelect = function(arr){
    var sel = new ELEM("select",false,false,`
    width: 200px;
    border-radius: 0 0 2px 2px;
    margin-top: -1px;
    background: url(//ssl.gstatic.com/ui/v1/disclosure/grey-disclosure-arrow-up-down.png) 95% no-repeat whiteSmoke;
    border: 1px solid gainsboro;
    font-size: 13px;
    line-height: 20px;
    padding: 5px 16px 5px 5px;
    vertical-align: middle;
    -webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: black;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    cursor: default;
    margin: 0em;
    font: 400 11px system-ui;

    `);
    for(var i = 0; i < arr.length; i++){
        sel.add("option",arr[i],"value:"+arr[i]+";",false);
    }
    return sel;
};




var div = body.add("div",false,false,"overflow:hidden;");

var cstyle = `
float:left;
width:200px;
`;

div.add("h1","Energy conversion tool");
var left = div.add("div",false,false,cstyle);
div.add("div","=",false,"width:100px;font-size:50px;text-align:center;color:#888;line-height:30px;padding-top:20px;float:left;");
var right = div.add("div",false,false,cstyle);

var vals = [
    ["J",1],
    ["KJ",1e+3],
    ["MJ",1e+6],
    ["wh",3.6e+3],
    ["kwh",3.6e+6],
    ["KgPetrol*",46.4e+6],
    ["Lpetrol*",34.2e+6],
    ["plastic bags*",46.4e+4],
    ["cal",4.184],
    ["kcal",4.184e+3],
    ["Electronvolt",1.6022e-19],
    ["hiroshima",6.3e+13],
    ["kg (e=mc^2)",89875517873681760],
    ["kg-Deuterium",87900000e+6],
    ["kg-wood*",18.0e+6],
    ["kg-glucose*",15.55e+6],
    ["snickers (100g/each)*",488e+3*4.184],
    ["kg-H20 formation", 16.22222e+6],
    ["kg-LiF formation", 23.72808e+6],
    ["kg-HF formation", 16.05450e+6],
    ["kg-BeO formation", 24.37600e+6]
];

var options = [];
//  ["J","KJ","MJ","wh",  "kwh", "KgPetrol*","Lpetrol*","plastic bags*","cal","kcal",  "Electronvolt","hiroshima","kg (e=mc^2)",     "kg-Deuterium","kg-wood*","kg-glucose*","snickers (100g/each)*"];
var opvalues  = [];
//[1  ,1e+3,1e+6,3.6e+3,3.6e+6,46.4e+6,    34.2e+6,   46.4e+4,        4.184,4.184e+3,1.6022e-19,    6.3e+13,     89875517873681760,87900000e+6,   18.0e+6,   15.55e+6,     488e+3*4.184];
vals.map((a,i)=>{
    options[i] = a[0];
    opvalues[i] = a[1];
});


var inputtextstyle = `
width:200px;
box-sizing:border-box;
line-height:50px;
font-size:25px;
text-align:center;
`;
var ltxt = left.add("input",false,"type:text;",inputtextstyle);
var lslct = left.add(genSelect(options));

var rtxt = right.add("input",false,"type:text;",inputtextstyle);
var rslct = right.add(genSelect(options));

ltxt.e.value = 1;
lslct.e.selectedIndex = 7;
rslct.e.selectedIndex = 4;
body.add("textarea",`use this field as your note.
If the unit ends with *, it accounts for the amount of energy released when it's combusted with oxygen. Oxygen mass is not incuded in calculation.`,false,"width:500px;box-sizing:border-box;height:150px;");
//end of html construction

var convertL = function(){
    try{
        var val = eval(ltxt.e.value);
        var lidx = lslct.e.selectedIndex;
        var ridx = rslct.e.selectedIndex;
        var result = val*opvalues[lidx]/opvalues[ridx];
        rtxt.e.value = isNaN(result)?"":result.toPrecision(7);
}catch(a){
    console.log(a);
}
};
var convertR = function(){
    try{
        var val = eval(rtxt.e.value);
        var lidx = lslct.e.selectedIndex;
        var ridx = rslct.e.selectedIndex;
        var result = val*opvalues[ridx]/opvalues[lidx]
        ltxt.e.value = isNaN(result)?"":result.toPrecision(7);
    }catch(a){
        console.log(a);
    }
};

ltxt.e.addEventListener("input",convertL);
lslct.e.addEventListener("input",convertL);


rtxt.e.addEventListener("input",convertR);
rslct.e.addEventListener("input",convertL);

convertL();



