var z =200
Probenanzahl = 110
var b = document.getElementById("Probenauswahl");
b.addEventListener("change", function() {
      if(b.value == "1")
      {Probenanzahl = 10, console.log(Probenanzahl);}

      if(b.value == "2")
      {Probenanzahl = 100,console.log(Probenanzahl)}
      
      if(b.value == "3")
      {Probenanzahl = 5000,console.log(Probenanzahl);}
      }
  )
function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
  document.getElementById("sensorx").innerHTML = x   
  document.getElementById("sensory").innerHTML = y
  document.getElementById("sensorz").innerHTML = z
zum()
 

  } 
function zum(){
if (z > 20) {squats1()} 
  if (z == 10.1) {squats2()} 
  if (z < 0) {squats3()}}

  var Zahlsquats1 = 0;
  var Zahlsquats2 = 0;
  var Zahlsquats3 = 0;

  function squats1() {
 Zahlsquats1 = Zahlsquats1+ 1;
  document.getElementById("A1").innerHTML = Zahlsquats1;} ; 
  
  function squats2() {
    Zahlsquats2 = Zahlsquats2+ 1;
     document.getElementById("A2").innerHTML = Zahlsquats2;} 
     
     function squats3() {
      Zahlsquats3 = Zahlsquats3+ 1;
       document.getElementById("A3").innerHTML = Zahlsquats3;}; 
    


   
  window.addEventListener("devicemotion", handleMotionEvent, true);
    



var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');



var linien = {};
// umsohöher umso langsamer läuft das Band


var scaleX = W/Probenanzahl;
var scaleY = 5;

var isRefresh = true;

linien.z = getInitArr(Probenanzahl);

if (!window.DeviceMotionEvent){
  document.getElementById('error').innerHTML = 'Device motion API not supported';
} else {
  window.addEventListener("devicemotion", doSample, false);
  document.getElementsByTagName("body")[0].addEventListener("click", function(ev){
    isRefresh = !isRefresh;
    document.getElementById('error').innerHTML = (isRefresh ? '' : 'Error');
  }, false);
  tick();  
}


function doSample(event) {
  shift(linien.z, event.accelerationIncludingGravity.z);
}

function tick() {
  window.requestAnimationFrame(tick);
  
  if (!isRefresh){
    return;
  }
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, W, H);
  
  zehnGlinie(),zwanzigabweichungslinie();
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
function zwanzigabweichungslinie(grid) {
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+100);
  ctx.lineTo(W, (H/2)+100);
  ctx.moveTo(0, (H/2)-0);
  ctx.lineTo(W, (H/2)-0);
  ctx.stroke();
}







function drawGraph(linien, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  ctx.lineWidth = 4
  ctx.strokeStyle = "red";
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

//add a sample to the end of the array
function shift(arr, datum) {
  var ret = arr[0];
  for (var i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }
  arr[arr.length - 1] = datum;
  return ret;
}

