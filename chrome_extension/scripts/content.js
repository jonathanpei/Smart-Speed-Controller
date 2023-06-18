var transcript = "";
var interval = null; 
var flag = false;
var loaded = false;

document.body.addEventListener("yt-navigate-finish", function(event) {
    endLoop();
    flag = false;
    loaded = false;
    interval = null;
    transcript = "";
});

function getTranscript(){   
    let url = document.location.href;
    
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    var match = url.match(regExp);
    var video_id =  (match&&match[7].length==11)? match[7] : false;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        transcript = JSON.parse(this.responseText);
        console.log(transcript);
    }
    xhttp.open("GET", "http://127.0.0.1:5000/?video_id=" + video_id);
    xhttp.send();

}


function startLoop(){
    if(flag == false){
        console.log("what????");
        flag = true;
        var vid = document.getElementsByTagName('video')[0];
        var ytplayer = document.getElementsByClassName('video-stream')[0];
        var time = ytplayer.currentTime;

        var curLine = 0;

        for(var i = 0; i<transcript.length; i++){
            if(transcript[i]["start"] <= time && transcript[i]["end"] >= time){
                curLine = i;
                break;
            }
        }

        interval = setInterval(function(){
            
            time = ytplayer.currentTime;
            if(time > transcript[curLine]['start']){
                vid.playbackRate = transcript[curLine]['speed'];
            }
            if(time > transcript[curLine]['end']){
                if(curLine < transcript.length - 1) curLine++;
            }
            if(time < transcript[curLine]['start']){
                if(curLine > 0) curLine--;     
            }

            if(time < transcript[curLine]['start'] || time > transcript[curLine]['end']){
                for(var i = 0; i<transcript.length; i++){
                    if(transcript[i]["start"] <= time && transcript[i]["end"] >= time){
                        curLine = i;
                        break;
                    }
                }
            }
        }, 100);
    }
}
function endLoop(){
    if(flag == true){
        clearInterval(interval);
        flag = false;
        var vid = document.getElementsByTagName('video')[0];
        var ytplayer = document.getElementsByClassName('video-stream')[0];
        vid.playbackRate = 1;
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            if(loaded == false){
                getTranscript();
                loaded = true;
                startLoop();
                
            }
            else{
                startLoop();
            } 
        }
        if( request.message === "end" ) {
            if(loaded == false){
                
            }
            else endLoop();
        }
    }
);

console.log("in content script");
