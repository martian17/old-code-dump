//require /lib/htmlgen0.js

body.add("script",null,'src="//www.youtube.com/iframe_api"',null);
var wrapper = body.add("div");
var iframe = wrapper.add("iframe",null,'id="youtube-video" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="640" height="385"',null);


//<iframe width="560" height="315" src="https://www.youtube.com/embed/xkMdLcB_vNU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="640" height="385" src="https://www.youtube.com/embed/xkMdLcB_vNU?autoplay=1&amp;loop=1&amp;rel=0&amp;fs=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fwww.infinitelooper.com&amp;widgetid=1">

//https://www.youtube.com/watch?v=xkMdLcB_vNU


var player;

var onYouTubeIframeAPIReady = function(){
    play("https://www.youtube.com/watch?v=xkMdLcB_vNU");
    player = new YT.Player('youtube-video', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    console.log(player);
};

var onPlayerReady = function() {
  console.log("hey Im ready");
  //do whatever you want here. Like, player.playVideo();

}

var onPlayerStateChange = function() {
  console.log("my state changed");
}


var play = function(url){
    var url = "https://www.youtube.com/embed/"+(url.split("/")[3].split("=")[1])+"?autoplay=1&amp;loop=1&amp;rel=0&amp;fs=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A2002&amp;widgetid=1";
    iframe.attr("src",url);
};

play("https://www.youtube.com/watch?v=xkMdLcB_vNU");

//https://www.youtube.com/embed/v=xkMdLcB_vNU?autoplay=1&loop=1&rel=0&fs=1&modestbranding=1&iv_load_policy=3&enablejsapi=1&widgetid=1



