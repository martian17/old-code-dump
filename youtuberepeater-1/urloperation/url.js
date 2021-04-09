

//ideas: twitter check image to see if it's original


/*
scheme://username:password@subdomain.domain.tld:port/path/file-name.suffix?query-string#hash

scheme://username:password@subdomain.domain.tld:port/path/file-name.suffix?query-string#hash
0        1        2        3                    4    5                     6            7
0        1                 3                    4    5                     6            7

(        ((                )((core part of domain)(    (                    (            (    )))))))

domain.tld


url = protocol? & mainurl
mainurl = auth? & url1
url1 = dns & port? & path
*/

//referrence: https://www.freeformatter.com/url-parser-query-string-splitter.html


//javascript macro
/*
var macro = {};
macro.terminateWhen = function(params){
    return `if(`+params.str+`[`+params.iterator+`] === "`+params.escaper+`"){
    `+params.iterator+`++;
    `+params.accumulator+`+=`+params.str+`[`+params.iterator+`];
}else if(`+params.str+`[`+params.iterator+`] === "`+params.terminator+`"){
    `+params.terminateAction+`
}else{
    `+params.accumulator+`+=`+params.str+`[`+params.iterator+`];
}`;
}
macro.terminateWhen({
    str:"str",
    accumulator:"tokenstr",
    iterator:"i",
    escaper:"\\\\",
    terminator:":",
    terminateAction:`    result.username = tokenstr;
    tokenstr = "";
    stage = 2;`
});*/


var parseURL = function(str){
    var result = {};
    var i = 0;
    var stage = 0;
    var endpoint1 = 0;
    while(i < str.len){
        if(stage === 0){//protocol
            //assuming that i=0
            if(str.slice(0,5) === "https"){
                result.protocol = "https"
                i = 5;
            }else if(str.slice(0,5) === "http"){
                i = 4;
            }else{
                //assumes that it is unspecified, and moves onto the next part
                ////throw new Error("unsupported protocol");
            }
            stage = 1;
            endpoint1 = i;
        }else if(stage === 1){
            if(str[i] === "\\"){
                i++;
                tokenstr+=str[i];
            }else if(str[i] === ":"){
                result.username = tokenstr;
                tokenstr = "";
                stage = 2;
            }else{
                tokenstr+=str[i];
            }
            i++;

            if(i >= str.len){
                //if fail go to the stage 3
                result.username = "";
                result.password = "";
                tokenstr = "";
                stage = 3;
                i = endpoint1;
            }
        }else if(stage === 2){
            if(str[i] === "\\"){
                i++;
                tokenstr+=str[i];
            }else if(str[i] === "@"){
                result.password = tokenstr;
                tokenstr = "";
                stage = 3;
            }else{
                tokenstr+=str[i];
            }
            i++;

            if(i >= str.len){
                //if fail go to the stage 3
                result.username = "";
                result.password = "";
                tokenstr = "";
                stage = 3;
                i = endpoint1;
            }
        }else if(stage === 3){
            //parsing the main part
            result.domainChain;//keep appending to this
            if(str[i] === "\\"){
                i++;
                tokenstr+=str[i];
            }else if(str[i] === "."){
                result.domainChain.push(tokenstr);
                tokenstr = "";
            }else{
                tokenstr+=str[i];
            }
            i++;
        }else if(stage === 4){

        }else if(stage === 5){

        }else if(stage === 6){

        }else if(stage === 7){

        }
    }
}

var getQuery = function(search){
    //var search = window.location.search;

}