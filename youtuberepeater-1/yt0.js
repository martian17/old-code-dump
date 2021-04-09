//require /lib/htmlgen0.js
//require ./player.js


var parseTime = function(time){
    var ts = time.split(":").map(a=>{return parseFloat(a)}).reverse();
    var v = 1;
    var t = 0;
    for(var i = 0; i < ts.length; i++){
        t += ts[i]*v;
        v *= 60;
    }
    return t;
};
var encodeTime = function(num){
    var h = Math.floor(num/3600);
    var m = Math.floor((num-h*3600)/60);
    var s = num-h*3600-m*60;
    if(h === 0){
        if(m === 0){
            return s;
        }else{
            return m+":"+s;
        }
    }else{
        return h+":"+m+":"+s;
    }
};
var urlToVid = function(url){
    url = new URL(url);
    return url.searchParams.get("v") || url.pathname.split("/").pop();
};
var queries = new URL(window.location.href).searchParams;
var targetURL = "https://www.youtube.com/watch?v="+(queries.get("v") || "xkMdLcB_vNU");
var sts = parseFloat(queries.get("sts")) || 3.5;
var eds = parseFloat(queries.get("eds")) || 89.5;

var modifyQuery = function(key,val){
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key,val);
    history.replaceState(null, null, "?"+queryParams.toString());
}


//html part

var wrapper = body.add("div");

wrapper.add("h1","YouTube Repeater (with precise fractions!!!)");

var r1 = wrapper.add("div",null,null,"overflow:hidden");

var d1 = r1.add("div",null,null,"float:left;");
d1.add("span","url:");
var urlDom = r1.add("input",null,'type="text"',null);
urlDom.e.value = targetURL;


var d2 = r1.add("div",null,null,"float:left;");
var button = r1.add("input",null,'type="button"value="play"',null);
button.e.addEventListener("click",a=>{
    console.log("button pressed");
    modifyQuery("v",urlToVid(urlDom.e.value));
    modifyQuery("sts",sts);
    modifyQuery("eds",eds);
    play(urlDom.e.value);
});

var r2 = wrapper.add("div",null,null,"overflow:hidden");

var d3 = r2.add("div",null,null,"float:left;");
d3.add("span","start:");
var startDom = d3.add("input",null,'type="text"',null);
startDom.e.addEventListener("input",a=>{
    sts = parseTime(startDom.e.value);
    modifyQuery("sts",sts);
});

var d4 = r2.add("div",null,null,"float:left;");
d4.add("span","end:");
var endDom = d4.add("input",null,'type="text"',null);
endDom.e.addEventListener("input",a=>{
    eds = parseTime(endDom.e.value);
    modifyQuery("eds",eds);
});





startDom.e.value = encodeTime(sts);
endDom.e.value = encodeTime(eds);



/*body.add("style",`
.full-screen iframe{
    transform-origin:0 0;
    transform:scale("+screen.width/640+");
}
`);*/
body.add("style",`
.db-player{
    max-width:900px;
}
.full-screen.db-player{
    max-width:100%;
}
.full-screen .yt-wrapper{
    padding-bottom: `+screen.height/screen.width*100+`%;
}
.full-screen yt-wrapper{
    width:100%;
}
`);
const DBPlayer = function(){
    const player1 = new Player();
    const player2 = new Player();
    const players = [player1,player2];
    this.players = players;
    const root = new ELEM("div",false,'class="db-player"');
    const that = this;
    root.add(player1);
    root.add(player2);
    this.e = root.e;
    this.main = player1;
    this.sub = player2;
    this.sub.e.style.display = "none";
    this.play = function(){
        that.main.play();
    }
    this.pause = function(){
        that.main.pause();
    }
    this.toggle = function(){
        const temp = that.main;
        that.main = that.sub;
        that.sub = temp;
        if(that.sub.playing){
            that.main.play();
        }else{
            that.main.pause();
        }
        that.sub.pause();
        this.main.e.style.display = "block";
        this.sub.e.style.display = "none";
    }
    this.setURL = (url)=>{
        players.map((player)=>{
            player.setURL(url);
        });
    }
}

const player = new DBPlayer();
wrapper.add(player);
wrapper.add("input",false,'type="button"value="full screen"').e.addEventListener("click",function(){
	player.e.requestFullscreen();
	player.e.classList.add("full-screen");
});
player.e.addEventListener('fullscreenchange', (e) => {
	if (!document.fullscreenElement) {
		console.log('Leaving full-screen');
		player.e.classList.remove("full-screen");
	}
});


const demon = function(e){
    var t = player.main.getTime();
    if(t >= eds){
        player.toggle();
        player.sub.setTime(sts);
    }
    //requestAnimationFrame(demon);
};
setInterval(demon,10);

var play = function(url){
    var vid = urlToVid(url)
    url = "https://www.youtube.com/embed/"+vid+"?autoplay=1&amp;loop=1&amp;rel=0&amp;fs=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;enablejsapi=1&amp;origin="+escape(window.location.origin)+"&amp;widgetid=1";
    player.setURL(url);
    player.main.setTime(sts);
    player.sub.setTime(sts);
    player.sub.pause();
};


(function(){
    var queries = new URL(window.location.href).searchParams;
    queries.get("v");
    queries.get("sts");
    queries.get("eds");
})()
