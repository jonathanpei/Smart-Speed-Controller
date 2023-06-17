transcript = [
    {
      "start": 1.02,
      "end": 13.200000000000001,
      "speed": 2.944999674552865
    },
    {
      "start": 13.2,
      "end": 26.22,
      "speed": 1.8099338025674454
    },
    {
      "start": 26.22,
      "end": 39.18000000000001,
      "speed": 4.524759503553516
    },
    {
      "start": 39.18,
      "end": 51.0,
      "speed": 1.4516368113395826
    },
    {
      "start": 51.0,
      "end": 64.32,
      "speed": 2.599038555776367
    },
    {
      "start": 64.32,
      "end": 74.46,
      "speed": 2.2678526675388784
    },
    {
      "start": 74.46,
      "end": 88.32,
      "speed": 2.71162139574581
    },
    {
      "start": 88.32,
      "end": 98.88,
      "speed": 2.08719239088417
    },
    {
      "start": 98.88,
      "end": 110.16,
      "speed": 1.5284212147971614
    },
    {
      "start": 110.16,
      "end": 122.7,
      "speed": 2.7526600270877863
    },
    {
      "start": 122.7,
      "end": 133.2,
      "speed": 1.9190811253223325
    },
    {
      "start": 133.2,
      "end": 145.74,
      "speed": 2.5524365229427786
    },
    {
      "start": 145.74,
      "end": 157.74,
      "speed": 1.5232507335085415
    },
    {
      "start": 157.74,
      "end": 170.94,
      "speed": 0.779118414901585
    },
    {
      "start": 170.94,
      "end": 182.52,
      "speed": 2.067969715786337
    },
    {
      "start": 182.52,
      "end": 195.0,
      "speed": 2.032095667561461
    },
    {
      "start": 195.0,
      "end": 206.46,
      "speed": 2.6558442449366892
    },
    {
      "start": 206.46,
      "end": 216.72,
      "speed": 1.4990181078021787
    },
    {
      "start": 216.72,
      "end": 226.8,
      "speed": 2.3334489457019196
    },
    {
      "start": 226.8,
      "end": 239.04,
      "speed": 2.5971067057478483
    },
    {
      "start": 239.04,
      "end": 249.11999999999998,
      "speed": 1.9669713957191641
    },
    {
      "start": 249.12,
      "end": 259.8,
      "speed": 1.5833352188379919
    },
    {
      "start": 259.8,
      "end": 272.52,
      "speed": 2.0525893077667066
    },
    {
      "start": 272.52,
      "end": 282.65999999999997,
      "speed": 2.6378496541628498
    },
    {
      "start": 282.66,
      "end": 295.26000000000005,
      "speed": 2.3330984481142107
    },
    {
      "start": 295.26,
      "end": 306.42,
      "speed": 1.3595797685337054
    },
    {
      "start": 306.42,
      "end": 316.85999999999996,
      "speed": 2.0115822638507788
    },
    {
      "start": 316.86,
      "end": 329.09999999999997,
      "speed": 0.8221203297422592
    },
    {
      "start": 329.1,
      "end": 341.46,
      "speed": 1.4819321141731365
    },
    {
      "start": 341.46,
      "end": 352.44000000000005,
      "speed": 2.443800515976455
    },
    {
      "start": 352.44,
      "end": 363.36,
      "speed": 3.268921513934474
    }
  ];

curLine = 0

var timeLoopset = setInterval(function(){

    var vid = document.getElementsByTagName('video')[0];
    var ytplayer = document.getElementsByClassName('video-stream')[0];

    var time =ytplayer.currentTime;
    if(time > transcript[curLine]['start']){
        vid.playbackRate = transcript[curLine]['speed'];
    }
    if(time > transcript[curLine]['end']){
        if(curLine < transcript.length - 1) curLine++;
    }
    
}, 100);



console.log("in content script");
