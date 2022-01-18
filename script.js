var ton = 1;
var pull = 1;
var Zahlsquats1 = 0;
var Zahlsquats2 = 0;
var Zahlsquats3 = 0;
var Probenanzahl = 500;
document.getElementById("canvas").style.display="none"
document.getElementById("neub").style.display="none"
document.getElementById("KniebA").style.display="none"
document.getElementById("ZAnzeige").style.display="none"

var t = document.getElementById("intervalw") 
t.addEventListener("change", function() {
    if(t.value == "1"){interval = 100;}
    if (t.value == "2"){interval = 300;}
    if (t.value == "3"){interval = 800;}
    if (t.value == "4"){interval = 1000;}
    })
var kt = document.getElementById("tonw") 
kt.addEventListener("change", function() {
    if(kt.value == "1"){ton = 1;}
    if (kt.value == "2"){ton = 2;}
      })  
var ach = document.getElementById("achsenw") 
ach.addEventListener("change", function() {
    if(ach.value == "1"){document.getElementById("ZAnzeige").style.display="none"}
    if (ach.value == "2"){document.getElementById("ZAnzeige").style.display=""}
          })  

var p = document.getElementById("pull") 
p.addEventListener("change", function() {
    if(p.value == "1"){pull = 1}
    if (p.value == "2"){pull = 2}
          })  


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

if (pull = 1){zvar()}
if (pull = 2){yvar()}
  

function zvar(){
  console.log("squatmodus")
if (z > 15) {schwer1()} 
if (z > 9.8 && z < 10.1){normal2()} 
if (z < 5) {leicht3()}
}       
function yvar(){
   console.log("pullmodus")
  if (y > 15) {schwer1()} 
  if (y > 9.8 && y < 10.1){normal2()} 
  if (y < 5) {leicht3()}
  }   

} 





var firstExecution = 0; // Store the first execution time
var interval = 300; // 2 millisekunden
function schwer1() {
    var date = new Date();
    var milliseconds = date.getTime(); 
    if((milliseconds - firstExecution) > interval)
    {
      firstExecution = milliseconds;
      Zahlsquats1 = Zahlsquats1+ 1;
      document.getElementById("A1").innerHTML = Zahlsquats1;
    } else {
      console.log("zufrüh" + interval);
    }
}

function normal2() {
  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval)
  {
    firstExecution = milliseconds;
    Zahlsquats2 = Zahlsquats2+ 1;
    document.getElementById("A2").innerHTML = Zahlsquats2;
    if (ton == 1){console.log("ton1")}
    if (ton == 2){tono(), console.log("ton2")};
  } else {
    console.log("zufrüh" +interval);
  }
}


function leicht3() {
  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval)
  {
    firstExecution = milliseconds;
    Zahlsquats3 = Zahlsquats3+ 1;
    document.getElementById("A3").innerHTML = Zahlsquats3;
  } else {
    console.log("zufrüh" +interval);
  }
}


 function tono(){
  var context = new AudioContext()
  var o = context.createOscillator()
  var  g = context.createGain()
  o.connect(g)
  g.connect(context.destination)
  g.gain.exponentialRampToValueAtTime( 0.00001, context.currentTime + 1)
  o.frequency.value = 100
  o.start(0)
  // stop beendet nur offizielweil > als context.currenTime +1
  o.stop(3)
}





// canvas gezchnet werden Linien

var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');
var linien = {};
var scaleX = W/Probenanzahl;
var scaleY = 5;
linien.z = getInitArr(Probenanzahl);
//es müssten 2 linien 




// DiviceMotionEvent ist spezialfunktion für den Sensor
function start() {
document.getElementById("wdiv").style.display ="none"
document.getElementById("canvas").style.display=""
document.getElementById("neub").style.display=""
document.getElementById("KniebA").style.display=""

uhrlos()
addEventListener("devicemotion", handleMotionEvent);
addEventListener("devicemotion", doSample);
tick();  
}


// wird y dann auch gezeichnet ?

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
  document.getElementById("wdiv").style.display =""
  document.getElementById("neub").style.display="none"
  removeEventListener("devicemotion", handleMotionEvent)
  removeEventListener("devicemotion", doSample)
  clearInterval(i)

}


