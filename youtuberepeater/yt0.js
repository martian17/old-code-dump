//require /lib/htmlgen0.js

//html part

var wrapper = body.add("div");

wrapper.add("h1","YouTube Repeater (with precise fractions!!!)");

var r1 = wrapper.add("div",null,null,"overflow:hidden");

var d1 = r1.add("div",null,null,"float:left;");
d1.add("span","url:");
var urlDom = r1.add("input",null,'type="text"value="https://www.youtube.com/watch?v=xkMdLcB_vNU"',null);

var d2 = r1.add("div",null,null,"float:left;");
var button = r1.add("input",null,'type="button"value="play"',null);
button.e.addEventListener("click",a=>{
    console.log("button pressed");
    play(urlDom.e.value);
});

var r2 = wrapper.add("div",null,null,"overflow:hidden");

var d3 = r2.add("div",null,null,"float:left;");
d3.add("span","start:");
var startDom = d3.add("input",null,'type="text"',null);
startDom.e.addEventListener("input",a=>{
    sts = parseFloat(startDom.e.value);
});

var d4 = r2.add("div",null,null,"float:left;");
d4.add("span","end:");
var endDom = d4.add("input",null,'type="text"',null);
endDom.e.addEventListener("input",a=>{
    eds = parseFloat(endDom.e.value);
});
var iframe = wrapper.add("iframe",null,'id="youtube-video" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="640" height="385"',"background-color:#000;color:#fff;font-size:3em;");
iframe.e.contentWindow.document.body.innerHTML = "<div style=\"color:#fff;font-size:1em;\">Input the url and press the \"play\" button above to continue</div>";
var formbottom = wrapper.add("div");




var player;
var sts = 3.5;
var eds = 89.25;
startDom.e.value = sts;
endDom.e.value = eds;

var playurl = "";

var onYouTubeIframeAPIReady = function(){
    play(playurl);
    player = new YT.Player('youtube-video', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
};

var onPlayerReady = function(){
    console.log(player);
    player.seekTo(sts);
    setInterval(function(){
        var t = player.getCurrentTime();
        if(t >= eds){
            player.seekTo(sts);
        }
    },20);
    /*var watcher = function(t){
        var t = player.getCurrentTime();
        if(t >= eds){
            player.seekTo(sts);
        }
        window.requestAnimationFrame(watcher);
    };
    window.requestAnimationFrame(watcher);*/
};

var onPlayerStateChange = function(){
    console.log("state changed")
};

var unplayed = true;

var play = function(url){
    if(unplayed){
        unplayed = false;
        body.add("script",null,'src="//www.youtube.com/iframe_api"',null);
        playurl = url;
        console.log(url);
    }else{
        playurl = url;
        //var url = "https://www.youtube.com/embed/"+(url.split("/")[3].split("=")[1])+"?autoplay=1&amp;loop=1&amp;rel=0&amp;fs=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A2002&amp;widgetid=1";
        var url = "https://www.youtube.com/embed/"+(url.split("/")[3].split("=")[1])+"?autoplay=1&amp;loop=1&amp;rel=0&amp;fs=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;enablejsapi=1&amp;origin="+escape(window.location.origin)+"&amp;widgetid=1";
        iframe.attr("src",url);
    }
};

//play("https://www.youtube.com/watch?v=xkMdLcB_vNU");





//if there was query
var query =
