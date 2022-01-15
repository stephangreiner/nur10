var Zahlsquats1 = 0;
var Zahlsquats2 = 0;
var Zahlsquats3 = 0;
var Probenanzahl = 500;
document.getElementById("canvas").style.display="none"
document.getElementById("neub").style.display="none"
document.getElementById("KniebA").style.display="none"
document.getElementById("ZAnzeige").style.display="none"



// startet die handleMotionEvent die ist speziell für den Sensor handling ungewöhnlich

function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
  //für die Darstellung werden die Variablen auf eine Dezimalstelle gerundet
  document.getElementById("sensorx").innerHTML = Math.round( x * 10 ) / 10;   
  document.getElementById("sensory").innerHTML = Math.round( y * 10 ) / 10;
  document.getElementById("sensorz").innerHTML = Math.round( z * 10 ) / 10;
  // ich glaub es ist besser mit schwer oben / Azsgabeungekehrt
if (z > 15) {schwer1()} 
if (z > 9.8 && z < 10.1){normal2()} 
if (z < 5) {leicht3()}
                                     } 

var firstExecution = 0; // Store the first execution time
var interval = 300; // 2 millisekunden
var t = document.getElementById("intervalw") 
t.addEventListener("change", function() {
    if(t.value == "1"){interval = 100;}
    if (t.value == "2"){interval = 300;}
    if (t.value == "3"){interval = 800;}
    if (t.value == "4"){interval = 1000;}
    })



function schwer1() {
    // current date
    var date = new Date();
    var milliseconds = date.getTime(); 
    if((milliseconds - firstExecution) > interval){
      firstExecution = milliseconds;
      console.log('squats1');
      Zahlsquats1 = Zahlsquats1+ 1;
      document.getElementById("A1").innerHTML = Zahlsquats1;
    } else {
      console.log("zufrüh" + interval);
    }
}

function normal2() {
  // current date
  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval){
    firstExecution = milliseconds;
    console.log('squats2');
    Zahlsquats2 = Zahlsquats2+ 1;
    document.getElementById("A2").innerHTML = Zahlsquats2;
  } else {
    console.log("zufrüh" +interval);
  }
}

function leicht3() {
  // current date
  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval){
    firstExecution = milliseconds;
    console.log('squats3');
    Zahlsquats3 = Zahlsquats3+ 1;
    document.getElementById("A3").innerHTML = Zahlsquats3;
  } else {
    console.log("zufrüh" +interval);
  }
}

// canvas uns Linien

var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');
var linien = {};
var scaleX = W/Probenanzahl;
var scaleY = 5;
linien.z = getInitArr(Probenanzahl);

// DiviceMotionEvent ist spezialfunktion für den Sensor
function start() {
document.getElementById("startb").style.display ="none"
document.getElementById("canvas").style.display=""
document.getElementById("neub").style.display=""
document.getElementById("KniebA").style.display=""
document.getElementById("ZAnzeige").style.display=""
uhrlos()
addEventListener("devicemotion", handleMotionEvent);
addEventListener("devicemotion", doSample);
tick();  
}


function doSample(event) {
  shift(linien.z, event.accelerationIncludingGravity.z);
}

function tick() {
  requestAnimationFrame(tick);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, W, H);
  
  zehnGlinie(),zehnleichtlinie();zehnschwerlinie()
  drawGraph(linien.z, scaleX, scaleY);
}

//die Zahlen sind entsprechend der oben angegeben Scale = 5 alle x *5
function zehnGlinie(grid) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+50);
  ctx.lineTo(W, (H/2)+50);
  ctx.stroke();
}
function zehnleichtlinie(grid) {
  ctx.strokeStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+100);
  ctx.lineTo(W, (H/2)+100);
  ctx.stroke();
}

function zehnschwerlinie(grid) {
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
   ctx.moveTo(0, (H/2)-0);
   ctx.lineTo(W, (H/2)-0);
  ctx.stroke();
}

function drawGraph(linien, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  ctx.lineWidth = 4
  ctx.strokeStyle = "green";
  if (min >= 1){ctx.strokeStyle = "red";}
  if (min >= 2){ ctx.strokeStyle = "violet";}
  if (min >= 3){ ctx.strokeStyle = "rgb(255, 255, 0)";
}
  ctx.beginPath();
  var len = linien.length;
  ctx.moveTo(0, linien[0] * scaleY);
  for(var i = 0; i < len; i++){
    ctx.lineTo(i*scaleX, linien[i]*scaleY);
   }
  ctx.stroke();
  ctx.restore();
}

//get Float32Array of length initialized to 0
function getInitArr(length) {
  var arr = new Float32Array(length);
  return arr;
}

//zieht eine Probe aus doSample und fügt sie zeitlich hinten an den Array an und malt so die Linie
function shift(arr, datum) {
  var ret = arr[0];
  for (var i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }
  arr[arr.length - 1] = datum;
  return ret;
}

//stopuhr

var sec = 0;
var min = "";

function tock(){
  document.getElementById("sekAn").innerHTML= sec
  document.getElementById("minAn").innerHTML= min
    sec = sec+1;
    if (sec >= 60) {sec = 0,min++;}
       }

function uhrlos() {
   i =setInterval(tock, 1000);
}
function neu(){
  sec = 0;
  min =0;
  Zahlsquats1 = 0;
  Zahlsquats2 = 0;
  Zahlsquats3 = 0;
  document.getElementById("A1").innerHTML = Zahlsquats1;
  document.getElementById("A2").innerHTML = Zahlsquats2;
  document.getElementById("A3").innerHTML = Zahlsquats3;
  document.getElementById("startb").style.display =""
  document.getElementById("neub").style.display="none"
  removeEventListener("devicemotion", handleMotionEvent)
  removeEventListener("devicemotion", doSample)
  clearInterval(i)

  

}


