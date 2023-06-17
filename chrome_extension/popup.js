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
document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('startButton');
    var end = document.getElementById('endButton');
    // onClick's logic below:
    start.addEventListener('click', function() {
        sendStart();
    });
    end.addEventListener('click', function() {
        sendEnd();
    });
});