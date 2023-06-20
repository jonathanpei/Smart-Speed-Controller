function helpme(){
    alert("ok");
}
function sendStart() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
    });
}
function sendEnd() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "end"});
    });
}
function sendLoad() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "load"});
    });
}
function sendSpeedUpdate(change) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "speedUpdate", "speed": change});
    });
}
var counter = 0;
sendSpeedUpdate(0);
document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('startButton');
    var end = document.getElementById('endButton');
    var speedDown = document.getElementById('speedDown');
    var speedUp = document.getElementById('speedUp');
    // onClick's logic below:
    start.addEventListener('click', function() {
        sendStart();
    });
    end.addEventListener('click', function() {
        sendEnd();
    });

    speedDown.addEventListener('click', function() {
        sendSpeedUpdate(-0.05);
    });
    speedUp.addEventListener('click', function() {
        sendSpeedUpdate(0.05);
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "updateSpeedText") {
            document.getElementById('speedText').innerHTML = "x" + request.speed;
        }
    }
);