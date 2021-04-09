var getTextFile = function(path){
    var ifr = document.createElement("iframe");
    document.body.appendChild(ifr);
    ifr.src = path;
    ifr.style = "display:none;";
    var callback;
    var decodeHTML = function(input){
        var e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    ifr.onload = function(){
        var strRawContents = this.contentWindow.document.body.childNodes[0].innerHTML;
        document.body.removeChild(this);
        callback(decodeHTML(strRawContents));
    }
    return function(c){
        callback = c;
    }
};

/*getTextFile("./test.ned")(function(t){
    console.log(t);
});*/