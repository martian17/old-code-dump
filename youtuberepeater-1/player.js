
// namespace usage: YTstate, onYouTubeIframeAPIReady, YT, Player

var YTstate = {
    ready:false,
    funcs:[],
    whenready:function(func){
        if(this.ready){
            func();
        }else{
            this.funcs.push(func);
        }
    }
};

var onYouTubeIframeAPIReady = function(){
    YTstate.ready = true;
    YTstate.funcs.map(func=>func());
};


(function(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    body.add("style",`
    .yt-wrapper{
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }
    .yt-wrapper>iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    `);
})();

const Player = function(){
    var id = Math.random().toString(36).slice(2);
    var wrapper = new ELEM("div",null,'class="yt-wrapper"');
    var iframe = wrapper.add("iframe",null,'id="'+id+'" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="640" height="385"',"background-color:#000;color:#fff;font-size:3em;");
    var ready = false;
    var raw_player;
    this.raw_player = raw_player;
    var that = this;


    var setTimePending = false;
    this.setTime = function(time){
        if(ready){
            raw_player.seekTo(time);
        }else{
            setTimePending = time;
        }
    };

    this.getTime = function(){
        if(ready){
            return raw_player.getCurrentTime();
        }else if(setTimePending !== false){
            return setTimePending;
        }else{
            return 0;
        }
    };

    this.playing = true;
    this.pause = function(){
        that.playing = false;
        if(ready){
            raw_player.pauseVideo();
        }
    };

    this.play = function(){
        that.playing = true;
        if(ready){
            raw_player.playVideo();
        }
    }

    this.e = wrapper.e;

    var onPlayerReady = function(){
        ready = true;
        console.log("player ready");
        console.log(raw_player);
        if(setTimePending !== false){
            that.setTime(setTimePending);
            setTimePending = false;
        }
        if(that.playing === true){
            that.play();
        }else{
            that.pause();
        }
    };

    var onStateChange = function(e){
        console.log(e);
        if(e.data === 1){
            that.playing = true;
        }else{
            that.playing = false;
        }
    };

    this.setURL = function(url){
        ready = false;
        YTstate.whenready(()=>{
            iframe.attr("src",url);
            raw_player = new YT.Player(id, {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onStateChange
                }
            });
            this.raw_player = raw_player;
        });
    }
};