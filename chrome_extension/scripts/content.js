var transcript = "";
var interval = null; 
var flag = false;
var loaded = false;
var multiplier = 1;
var speedText = document.createElement('h2');
var vid;
speedText.id = "speedLabel";
document.body.addEventListener("yt-navigate-finish", function(event) {
    waitForVideo().then(()=>{
        vid = document.getElementsByTagName('video')[0];
        vid.addEventListener('play', function(e) {
            console.log(flag);
            if(flag == true){
                startLoop();
            }
        });
        vid.addEventListener('pause', function(e) {
            endLoop();
        });
        vid.addEventListener('ended', function(e) {
            endLoop();
        });
    });
    endLoop();

    flag = false;
    loaded = false;
    interval = null;
    multiplier = 1;
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
    }
    xhttp.open("GET", "https://speedwatch.jonathanpei1.repl.co/video?video_id=" + video_id);
    xhttp.send();

}


function startLoop(){
    clearInterval(interval);
    document.getElementById("actions-inner").append(speedText);
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
            vid.playbackRate = transcript[curLine]['speed'] * multiplier;
            document.getElementById("speedLabel").innerHTML ="The current speed is "+ vid.playbackRate;
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
function endLoop(){
    clearInterval(interval);
    var ytplayer = document.getElementsByClassName('video-stream')[0];
    vid.playbackRate = 1;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            flag = true;
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
            flag = false;
            if(loaded == false){
                
            }
            else {
                endLoop();
            }
        }
        if( request.message === "speedUpdate" ) {
            multiplier += request.speed;
            multiplier = Math.round(multiplier * 100) / 100
            chrome.runtime.sendMessage({
                message: "updateSpeedText", 
                speed: multiplier
            });
        }

    }
);

function waitForVideo() {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (document.getElementsByTagName('video')[0]) {
          clearInterval(intervalId);
          resolve();
        }
      }, 500);
    });
}

