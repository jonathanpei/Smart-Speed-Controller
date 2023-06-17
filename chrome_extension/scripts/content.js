

setTimeout(function(){
    var vid = document.getElementsByTagName('video')[0];

    

    var button = document.createElement("button");
    button.innerHTML = "laksdjflasjdf";
    button.onclick = function(){
        vid.playbackRate=2;
    }

    document.getElementById("snippet").appendChild(button);
}, 10000);



console.log("in content script");
