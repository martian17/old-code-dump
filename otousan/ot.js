var div = document.createElement("div");
div.innerHTML = "お父さん、これどう思う？";
document.body.appendChild(div);
div.style = `
width:100vw;
height:60vh;
font-size:50px;
text-align:center;
padding-top:100px;
box-sizing:border-box;
`;

var div = document.createElement("div");
div.innerHTML = "話を聞く";
document.body.appendChild(div);
div.style = `
width:300px;
margin-left:50%;
position:absolute;
background-color:#faa;
left:-150px;
height:60p;
font-size:50px;
text-align:center;
padding-top:10px;
padding-bottom:10px;
box-sizing:border-box;
`;

div.addEventListener("click",function(){
    var ca = [
        "いいと思うよ",
        "ダメだと思う",
        "ありがとう",
        "ごめんなさい",
        "今度お茶でもどう？",
        "工事現場にでも言ってこい",
        "幼稚園からやり直せ",
        "大丈夫？",
        "いつもうるさい",
    ];
    var ri = Math.floor(ca.length*Math.random());
    alert(ca[ri]);
});

