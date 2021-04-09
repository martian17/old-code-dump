//require /lib/htmlgen0.js

var words00 =
[
    [
        "natsuko","akihabara","Murai kenkyukai","Middle east","imagination"
    ],//william

    [
        "congo","mango","french","labratory","furniture"
    ],//natsuko

    [
        "Science Fiction","billingual person(person who knows two languages)","Mars","archman","cartoon"
    ],//sayyor

    [
        "hotdog","hamburger","dog","marijuana","beer"
    ]//yutaro

];

var words0 = words00.reduce(function(a,b){
    return a.concat(b);
});


var words;


var arrcpy = function(arr){
    var arr1 = [];
    for(var i = 0; i < arr.length; i++){
        arr1[i] = arr[i];
    }
    return arr1;
};

var ranword = function(){
    var idx = Math.floor(Math.random()*words.length);
    var ret = words.splice(idx,1);
    return ret[0];
};


var reset = function(){
    words = arrcpy(words0);
};


var init = function(){
    reset();
    var div = body.add("div","---","","width:500px;height:100px;line-height:100px;font-size:30px;text-align:center;");
    var button1 = body.add("input","",`type="button"value="select a word"`);
    button1.e.addEventListener("click",function(){
        if(words.length === 0){
            console.log("no more words");
            div.e.innerHTML = "---";
            return;
        }
        var word = ranword();
        div.e.innerHTML = word;
    });
    body.add("br");
    var button2 = body.add("input","",`type="button"value="reset"`);
    button2.e.addEventListener("click",function(){
        reset();
    });
    console.log(123)
};


init();