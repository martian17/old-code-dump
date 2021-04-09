class Row{
    constructor(name,def){
        this.elem = document.createElement("div");
        this.nameElem = document.createElement("span");
        this.elem.appendChild(this.nameElem);
        this.input = document.createElement("input");
        this.input.setAttribute("type","text");
        this.input.value = def;
        this.elem.appendChild(this.input);
        console.log(name);
        //this.name = name || "";
        this.nameElem.innerHTML = name;
    }
    name(name){
        this.nameElem.innerHTML = name;
        return this;
    }
    get value(){
        return this.input.value;
    }
};

class RowRange{
    constructor(name,min,max,step,def){
        this.elem = document.createElement("div");
        this.nameElem = document.createElement("span");
        this.elem.appendChild(this.nameElem);
        this.input = document.createElement("input");
        this.input.setAttribute("type","range");
        this.input.setAttribute("min",(min));
        this.input.setAttribute("max",(max));
        this.input.setAttribute("step",(step));
        this.input.value = def;

        this.elem.appendChild(this.input);
        console.log(name);
        this.nameElem.innerHTML = name;
        //this.name = name || "";
    }
    action(callback){
        this.elem.addEventListener("input",()=>{callback(parseFloat(this.value))});
        return this;
    }
    min(min){
        this.input.setAttribute("min",min|0);
        return this;
    }
    max(max){
        this.input.setAttribute("max",max|0);
        return this;
    }
    step(step){
        this.input.setAttribute("step",step|0);
        return this;
    }
    name(name){
        this.nameElem.innerHTML = name;
        return this;
    }
    get value(){
        return this.input.value;
    }
};

class Button{
    constructor(name){
        this.elem = document.createElement("input");
        this.elem.setAttribute("type","button");
        this.elem.value = name || "";
    }
    action(callback){
        this.elem.addEventListener("click",callback);
        return this;
    }
    name(n){
        this.elem.value = n;
        return this;
    }
    get value(){
        return this.elem.value;
    }
};


var EL = function(type,inner){
    var el = document.createElement(type);
    el.innerHTML = inner;
    return el;
};




class Form{
    constructor(){
        this.elem = document.createElement("form");
    }
    add(type){
        var elem = document.createElement("input");
        elem.setAttribute("type","range");
        form.appendChild(elem);
    }
    Row(name){
        var row = new Row(name);
        this.elem.appendChild(row.elem);
        return row;
    }
    Button(name){
        var button = new Button(name);
        this.elem.appendChild(button.elem);
        return button;
    }
};