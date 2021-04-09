

function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
  document.getElementById("sensorx").innerHTML = x   
  document.getElementById("sensory").innerHTML = y
  document.getElementById("sensorz").innerHTML = z

  if (z > 20) {squats()} 
  if (z < 0)  {jumps()} 
  } 
  
  var Zahlsquats = 0;
  function squats() {
 Zahlsquats = Zahlsquats+ 1;
  document.getElementById("über20Anzei").innerHTML = Zahlsquats;} 
    
  
  var Zahljumps = 0;
  function jumps()  {
  Zahljumps =Zahljumps + 1;
  document.getElementById("über20Anzei").innerHTML = Zahljumps;} 
    
   
  window.addEventListener("devicemotion", handleMotionEvent, true);
    



var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');



var linien = {};

var SAMPLES_COUNT = 64;
var COLORS = {
  x: 'blue',
  y: 'green',
  z: 'red'
};

var scaleX = W/SAMPLES_COUNT;
var scaleY = 10;

var isRefresh = true;

linien.x = getInitArr(SAMPLES_COUNT);
linien.y = getInitArr(SAMPLES_COUNT);
linien.z = getInitArr(SAMPLES_COUNT);

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
  shift(linien.x, event.accelerationIncludingGravity.x);
  shift(linien.y, event.accelerationIncludingGravity.y);
  shift(linien.z, event.accelerationIncludingGravity.z);
}

function tick() {
  window.requestAnimationFrame(tick);
  
  if (!isRefresh){
    return;
  }
  ctx.fillStyle = 'pink';
  ctx.fillRect(0, 0, W, H);
  
  hilfslinienmalen(5);
  drawGraph(linien.x, COLORS.x, scaleX, scaleY);
  drawGraph(linien.y, COLORS.y, scaleX, scaleY);
  drawGraph(linien.z, COLORS.z, scaleX, scaleY);
}


function hilfslinienmalen(grid) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(0, H/2);
  ctx.lineTo(W, H/2);
  ctx.stroke();
  var count = H/2 / (grid*scaleY);
  ctx.strokeStyle = 'yellow';
  for (var i=1; i<count; i++){
    ctx.beginPath();
    ctx.moveTo(0, H/2-i*grid*scaleY);
    ctx.lineTo(W, H/2-i*grid*scaleY);
    ctx.stroke();  
    
    ctx.beginPath();
    ctx.moveTo(0, H/2+i*grid*scaleY);
    ctx.lineTo(W, H/2+i*grid*scaleY);
    ctx.stroke();
  }
}

function drawGraph(linien, color, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  
  ctx.strokeStyle = color;
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
  for (var i = 0; i < length; i++) {
    arr[i] = 0;
    arr[i] = Math.random() * 4 - 2;
  }
  arr[length - 2] = 0.5;
  arr[length - 1] = -0.5;

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

